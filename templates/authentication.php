<link rel="stylesheet" href="CSS/login.css">
</head>
<body>
	<div id="logout" style="display:none">
		<button id='logout'>Log out</button>
	</div>
	<script src="js/logout.js"></script>

	<div class="authentication">
		<input type='email' name='email' placeholder='Email' id='email'>
		<input type='password' name='password' placeholder='Password' id='password'>
		<button id='submit'>Log In</button>
	</div>

	<div class="accountOptions">
		<a id="link-registation" href="?page=registation">Create an account</a>
		<a id="passwordRecuperation" href="?page=authentication">Recovery password</a>
	</div>

	<script src="js/authentication.js"></script>