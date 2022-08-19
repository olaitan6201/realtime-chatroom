<script>
	import { auth, authStateChanged, signInWithGoogle } from './firebase.js'
	import Chatroom from './Chatroom.svelte'
	import { authState } from 'rxfire/auth'

	let user;

	// const unsubscribe = authStateChanged();
	const unsubscribe = authState(auth).subscribe(usr => user = usr);

	const login = () => signInWithGoogle().then(usr => user = user);

	const logOut = () => auth.signOut();
</script>

<main>
	{#if user }
		<Chatroom user={user} logout={logOut} />
	{:else}
		<div class="login-form">
			<button on:click={login}>
				<i class="fa fa-google"></i>
				Sign In With Google
			</button>
		</div>
	{/if}
</main>

<style lang="scss">
	main{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		max-width: 400px;
		max-height: 500px;
		background-color: #fff;
		border: 1px solid #eee;
		box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.05);

		.login-form{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			
			button{
				padding: 10px;
				background-color: #fff;
				font-size: 16px;
				cursor: pointer;
				outline: none;
				border: 1px solid #bbb;


				i{
					padding-right: 10px;
					border-right: 1px solid #ddd;
					color: #555;
				}
			}
		}
	}
</style>