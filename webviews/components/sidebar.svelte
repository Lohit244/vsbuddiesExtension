<script lang="ts">
import { onMount } from "svelte";


    let friends: Array<{uid: string; icon: string; name:string}> = [{
        uid: "18972987928",
        icon: "https://avatars.githubusercontent.com/u/95533731?v=4",
        name: "Friend 1"
    },{
        uid: "18972983428",
        icon: "https://avatars.githubusercontent.com/u/95533731?v=4",
        name: "Friend 2"

    },{
        uid: "189721127928",
        icon: "https://avatars.githubusercontent.com/u/95533731?v=4",
        name: "Friend 3"
    },{
        uid: "1897298127928",
        icon: "https://avatars.githubusercontent.com/u/95533731?v=4",
        name: "Friend 4"
    },{
        uid: "1897291287928",
        icon: "https://avatars.githubusercontent.com/u/95533731?v=4",
        name: "That one friend with a long ass name that doesnt fit in any text field aka me"
    },]

let searchText = '';
    let filteredFriends = friends.filter(f=>f.name.includes(searchText));
const searchFriends = ()=>{
    filteredFriends = friends.filter(f=>f.name.includes(searchText));
}
    onMount(()=>{
        window.addEventListener("message", (event)=>{
            const message = event.data;
            switch (message.type){
                case "extensions":
                    console.log(message.value[0])
            }
        })
    })
</script>
<style>
    input{
        border: 1px dashed gray;
    }
    .contact-card{
        display: flex;
        gap: 10px;
        border: 1px solid gray;
        align-items: center;
        background-color:var(--vscode-editor-background);
        font-size: var(--vscode-font-size);
        color: var(--vscode-foreground);
        font-family: var(--vscode-font-family);
    }
    .contact-card-image{
        height: 50px;
        border-radius: 50%;
    }
    .contact-card-name{
        font-weight: bold;
    }
</style>


    <!-- <button> Sign In</button> -->
    <form on:submit|preventDefault={searchFriends}>
        <input bind:value={searchText}/>
        <button on:click={searchFriends}>Search</button>
    </form>
    {#each filteredFriends as friend (friend.uid)}
        <button class="contact-card">
            <img class ="contact-card-image" src={friend.icon} alt="profilephoto" />
            <p class="contact-card-name">{friend.name}</p>
        </button>
    {/each}