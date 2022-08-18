<script>
    import { getChats, sendMessage } from './firebase'

    export let user;
    export let logout;
    
    let message = "";
    let chats = [];

    const sendMsg = () => sendMessage(user, message).then(res => {
        if(res) message = "";
        fetchChats();
    });

    const fetchChats = () => getChats().then(data => chats = data);

    // $: fetchChats()
    // $: console.log(chats, user, message);
    setInterval(()=>{
        fetchChats();
    }, 2000)

</script>

<main>
    <div class="header">
        <div class="logo">Chatroom</div>
        <button on:click={logout}>Log Out</button>
    </div>
    <div class="messages">
        {#each chats as chat}
            {#if user.uid == chat.uid}
            <div class="message my-message">
                <div class="text">
                    {chat.message}
                </div>
            </div>
            {:else}
            <div class="message other-message">
                <div class="avatar">
                    <img src={chat.avatar} alt="" />
                </div>
                <div class="text">
                    {chat.message}
                </div>
            </div>
            {/if}
        {/each}
    </div>
    <div class="form">
        <input type="text" bind:value={message} />
        <button on:click={sendMsg}>
            <i class="fa fa-paper-plane"></i>
        </button>
    </div>
</main>

<style type="text/scss">
    @import './styles/chatroom.scss'
</style>