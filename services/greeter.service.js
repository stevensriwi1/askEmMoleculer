"use strict";

var admin = require("firebase-admin");

var serviceAccount = require("../askem-flutter-firebase-adminsdk-ckzgy-7e32cf7574.json");

module.exports = {
	name: "greeter",

	create: {
		params: {
			username: { type: "string" },
			password: { type: "string" },
			firstname: { type: "string" },
			lastname: { type: "string" }
		},
		handler(ctx) {
			let db = this.getDatabase();

			return db
				.collection("users")
				.where("username", "==", ctx.params.username)
				.get()
				.then(function (querySnapshot) {
					if (querySnapshot.size == 0) {
						return db
							.collection("users")
							.add({
								username: ctx.params.username,
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
				});
		}
	},
	/**
	 * Service settings
	 */
	settings: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],	

	/**
	 * Actions
	 */
	actions: {

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
		 	return admin.firestore();
		 }
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		console.log("helo");
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: "https://askem-flutter.firebaseio.com"
		});
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