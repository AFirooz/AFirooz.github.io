# Mediator

A medium inspired Jekyll blog [theme](https://github.com/dirkfabisch/mediator). The basic idea came from the Ghost theme
[Readium 2.0](http://www.svenread.com/readium-ghost-theme/).

* Use header images in articles, if you want to (add tag "image" and url to the image in the front matter section of a post)

## Getting Started Locally

* Install `ruby3.0-dev`
* Install the required gems: `bundle install`
* Run the jekyll server: `bundle exec jekyll serve --livereload`

You should have a server up and running locally at <http://localhost:4000>.

## Configuration

The main settings happen inside of the _config.yml file:

### Site

Main settings for the site

* **title**: name of your site
* **description**: description of your site
* **logo**: small logo for the site (300x * 300x)
* **cover**: large background image on the index page

* **name**: name site owner
* **email**: mail address of the site owner
* **author**: author name
* **author_image**: small image of author (300x * 300px)
* **disqus**: add a disqus forum for your post

### Social

The template allows to add all major social platforms to your site.
Fill the the form for each platform. If you leave the share_* entries empty, the sharing buttons below a post are not shown.  If you leave the **url** and **desc** empty the icons are not shown on the index page, but the share icons on the article pages remains untouched (Thanks to [Phil](https://github.com/philsturgeon))

* **icon**: name of social platform (must match a name of [font-awsome](http://fortawesome.github.io/Font-Awesome/) icon set )
* **url**: url of your account
* **desc**: slogan of the platform
* **share_url**: share url
* **share_title**: first part of url for the title
* **share_link**: second part of the share url for the link to the post

The Liquid template engine will magical combine the different parts to a share url.

```url
http://twitter.com/share?text=post_title&amp;url=post_url
````

See [_config.yml](https://github.com/dirkfabisch/mediator/blob/master/_config.yml) for more examples.

## Licensing

[MIT](https://github.com/dirkfabisch/mediator/blob/master/LICENCE) with no added caveats, so feel free to use this on your site without linking back to me or using a disclaimer or anything silly like that.

## Contact

I'd love to hear from you at [@dirkfabisch](https://twitter.com/dirkfabisch). Feel free to open issues if you run into trouble or have suggestions. Pull Requests always welcome.
