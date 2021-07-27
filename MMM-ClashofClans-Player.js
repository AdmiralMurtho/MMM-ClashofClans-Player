Module.register("MMM-ClashofClans-Player", {
    /*defaults: {
        updateInterval: 30000,
        playerTag: "YQLQ902Y", //Without the Hashtag
    },

    start: function () {
        Log.info(`Starting Module: ${this.name}`);

    },

    getDom: function () {
        var wrapper = document.createElement("div");
        var compliment = document.createElement("span");
        compliment.appendChild(document.createTextNode("Test"));
        wrapper.appendChild(compliment);

        return wrapper;
    }*/
    // Default module config.
    defaults: {
        text: "Hello World!"
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = this.config.text;
        return wrapper;
    }
})