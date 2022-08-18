<script>
import { createEventDispatcher } from "svelte";


    export let user;
    
    const dispatch = createEventDispatcher();

    dispatch('logOut');
</script>