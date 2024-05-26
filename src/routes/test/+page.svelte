<script lang="ts">
    import { compile } from "mdsvex";
    let testCode = compile(/*js*/`js
        var hereIs = "A block of code";
    `)
</script>

<div class="test-code">
    Here is <code>someInlineFunction();</code>
    <br/>
    
    {#await testCode}
        <p>Loading</p>
    {:then testCode}
        {@html testCode?.code ?? "<p>ERROR</p>"}
    {:catch err}
        <p>{err}</p>
    {/await}
</div>

<hr/>

<div class="test-headers">
    <h1>Here is a h1</h1>
    <h2>Here is a h2</h2>
    <h3>Here is a h3</h3>
    <h4>Here is a h4</h4>
    <h5>Here is a h5</h5>
    <h6>Here is a h6</h6>
</div>
