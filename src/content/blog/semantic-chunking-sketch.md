---
title: 'Example: semantic chunking in forty lines'
description: A placeholder technical post showing how a longer write-up with code reads on this site.
date: 2026-11-12
tags: [rag, python, example]
draft: true
---

> **Example post.** Placeholder content to show how a technical write-up looks. Replace it with your own.

Fixed-size chunks are the default in most retrieval pipelines because they are easy: cut every _N_ tokens, overlap a
little, move on. The cost shows up later, when a chunk boundary lands in the middle of an argument and the retriever
returns half of it.

## The idea

Semantic chunking keeps adding sentences to a chunk while they stay on topic, and starts a new chunk when the next
sentence drifts. "On topic" is measured as cosine similarity between the sentence and the running average of the
chunk so far.

Two knobs matter:

- **`threshold`**: how similar a sentence must be to stay in the current chunk.
- **`max_sentences`**: a hard cap, so one long uniform section cannot become one enormous chunk.

## The code

```python
from dataclasses import dataclass

import numpy as np


@dataclass
class Chunk:
    text: str
    start: int  # index of the first sentence
    end: int    # index one past the last sentence


def cosine(a: np.ndarray, b: np.ndarray) -> float:
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))


def semantic_chunks(sentences, embed, threshold=0.75, max_sentences=12):
    """Group consecutive sentences until similarity to the running chunk drops."""
    if not sentences:
        return []

    vectors = embed(sentences)
    chunks, start, centroid = [], 0, vectors[0]

    for i in range(1, len(sentences)):
        too_long = i - start >= max_sentences
        if too_long or cosine(centroid, vectors[i]) < threshold:
            chunks.append(Chunk(" ".join(sentences[start:i]), start, i))
            start, centroid = i, vectors[i]
        else:
            n = i - start
            centroid = (centroid * n + vectors[i]) / (n + 1)

    chunks.append(Chunk(" ".join(sentences[start:]), start, len(sentences)))
    return chunks
```

`embed` is any function that turns a list of strings into a 2-D array, one row per sentence.

## What to measure

A chunker is only better if retrieval gets better. Before swapping one in, fix a small set of questions with known
answers and compare:

| Metric            | Question it answers                              |
| ----------------- | ------------------------------------------------ |
| Hit rate @ k      | Is the right chunk in the top _k_ at all?        |
| Mean reciprocal rank | How high does it rank?                        |
| Answer faithfulness  | Does the final answer stay within the sources? |

### A caveat

Similarity thresholds do not transfer between embedding models. A value that works for one model can split every
sentence, or nothing at all, on another, so tune it against your own evaluation set.
