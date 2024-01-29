<script lang="ts">
    export let data;
</script>

<main>
    # Wait up a bit

    This site has several RSS endpoints.

    You can use the main one at `{data.hostname}/rss.xml`, which contains every blog of every category.
        But every category has a separate RSS feed.

    If you want an RSS feed for lets say a category called `programming`,
    you just need to add `{data.hostname}/rss.xml/programming` into your RSS viewing software.
</main>
