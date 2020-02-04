"use strict";

var admin = require("firebase-admin");
var firebase = require("firebase");
var serviceAccount = require("../askem-flutter-firebase-adminsdk-ckzgy-7e32cf7574.json");
var firebaseConfig = {
	apiKey: "AIzaSyDxKfibKOwzZ28Ths0CfAmuPKZX_B-4dc4",
	authDomain: "askem-flutter.firebaseapp.com",
	databaseURL: "https://askem-flutter.firebaseio.com",
	projectId: "askem-flutter",
	storageBucket: "askem-flutter.appspot.com",
	messagingSenderId: "690557268367",
	appId: "1:690557268367:web:4f0f9cf2257bc7b2375bfa",
	measurementId: "G-5X3ZE3EBTL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
	name: "manageusers",


	/**
	 * Service settings
	 */
	settings: {
		cors: {
            // Configures the Access-Control-Allow-Origin CORS header.
            origin: "*",
            // Configures the Access-Control-Allow-Methods CORS header. 
            methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
            // Configures the Access-Control-Allow-Headers CORS header.
            allowedHeaders: [],
            // Configures the Access-Control-Expose-Headers CORS header.
            exposedHeaders: [],
            // Configures the Access-Control-Allow-Credentials CORS header.
            credentials: false,
            // Configures the Access-Control-Max-Age CORS header.
            maxAge: 3600
        },

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		createAccount: {
			params: {
				email: "string",
				password: "string",

			},
			handler(ctx) {
				return this.createAccount(ctx);
			}
		},
		createDatabaseAccount: {
			params: {
				email: "string"

			},
			handler(ctx) {
				return this.createDataBaseUser(ctx);
			}
		},
		signIn: {
			params: {
				email: "string",
				password: "string"

			},
			handler(ctx) {
				
				return this.signIn(ctx);
			}
		},
		/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		hello() {
			return "Hello Moleculer";
		},

		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		welcome: {
			params: {
				name: "string"
			},
			handler(ctx) {
				return `Welcome, ${ctx.params.name}`;
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
		getDatabase() {
			return firebase.firestore();
		},

		async signIn(ctx) {
			var userId;
			await firebase.auth().signInWithEmailAndPassword(ctx.params.email, ctx.params.password).then(function() {
				console.log("successful loggin");
				var currentUserTest = firebase.auth().currentUser;
				userId = firebase.auth().currentUser.uid;
				console.log(userId);
				return userId;
			}).catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
			});
			return userId;
		},
		createAccount(ctx) {

			firebase.auth().createUserWithEmailAndPassword(ctx.params.email, ctx.params.password).catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
			});
			/*db.collection("users").where("email", "==", ctx.params.email).get()
				.then(function (querySnapshot) {
					if (querySnapshot.size == 0) {
						return db
							.collection("users")
							.add({
								firstName:ctx.params.firstName,
								lastName:ctx.params.lastName,
								email: ctx.params.email,
								password: ctx.params.password
							})
							.then(function (docRef) {
								console.log("Document written with ID: ", docRef.id);
								return "Success";
							})
							.catch(function (error) {
								console.error("Error adding document: ", error);
							});
					} else {
						return "UserExist";
					}
				});*/

		},
		createDataBaseUser(ctx) {
			var db = this.getDatabase();
			// Add a new document in collection "user"
			let data = {
				email: ctx.params.email,
				firstName: "Steven",
				lastName: "Sriwi"
			};
			db.collection("users").doc(firebase.auth().currentUser.uid).set(data)
				.then(function () {
					console.log("Document successfully written!");
				})
				.catch(function (error) {
					console.error("Error writing document: ", error);
				});
		},
		getStatus() {
			firebase.auth().onAuthStateChanged(function (user) {
				if (user) {
					// User is signed in.
					var displayName = user.displayName;
					var email = user.email;
					var emailVerified = user.emailVerified;
					var photoURL = user.photoURL;
					var isAnonymous = user.isAnonymous;
					var uid = user.uid;
					var providerData = user.providerData;
					// ...
				} else {
					// User is signed out.
					// ...
				}
			});
		}

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		/*admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: "https://askem-flutter.firebaseio.com"
		});
		*/
		var db = this.getDatabase();

		var aa = db
			.collection("users")
			.get()
			.then(s => {
				console.log("Firebase Database Initialzed");
			});
	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};