<script lang="ts">
    export let data;
    let rssXmlFile = `${data.hostname}/rss.xml`;
</script>

# Wait up a bit

This site has several RSS endpoints.

You can use the main one at <a href={rssXmlFile}>{rssXmlFile}</a>, which contains every blog of every category.
    But every category has a separate RSS feed.

<br/>

If you want an RSS feed for lets say a category called `programming`,
you just need to add <a href={rssXmlFile}>{rssXmlFile}/programming</a> into your RSS viewing software.
