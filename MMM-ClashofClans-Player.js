Module.register("MMM-ClashofClans-Player", {
    defaults: {
        updateInterval: 60 * 60 * 1000, //Every 60 Minutes
        playerTag: '', //Without the Hashtag
        playerToken: '' //This is available on https://developer.clashofclans.com -> My Account
    },

    start: function () {
        Log.info(`Starting Module: ${this.name}`);

        this.playerName = ''
        this.trophies = ''
        this.ranking_src = ''
        this.clan_src = ''
        this.clan_name = ''
        this.loaded = false
        this.sheduleUpdate()
    },

    getStyles: function () {
        return ['MMM-ClashofClans-Player.css'];
    },

    getPlayerStats: function() {
        this.sendSocketNotification('GET-PLAYER-STATS', {'name': this.config.playerTag, 'token': this.config.playerToken});
    },

    getDom: function () {
        if(this.loaded){
            var wrapper = document.createElement("div");

            var name_container = document.createElement("div")
            var span = document.createElement("span")
            span.appendChild(document.createTextNode(this.playerName))
            name_container.appendChild(span)
            name_container.classList.add("CoC_container", "CoC_underline")
            wrapper.appendChild(name_container)

            var stats_container = document.createElement("div")
            stats_container.classList.add("CoC_container")

            var ranking = document.createElement("div")
            ranking.classList.add("CoC_half")
            var ranking_title = document.createElement("span")
            ranking_title.classList.add("header")
            ranking_title.appendChild(document.createTextNode("Ranking"))
            ranking.appendChild(ranking_title)

            var ranking_details = document.createElement("div")
            ranking_details.classList.add("header")
            var immage_rank = document.createElement("img")
            immage_rank.src = this.ranking_src
            immage_rank.classList.add("CoC_image")
            ranking_details.appendChild(immage_rank)
            var trophies_span = document.createElement("span")
            trophies_span.appendChild(document.createTextNode(this.trophies))
            ranking_details.appendChild(trophies_span)
            ranking.appendChild(ranking_details)

            stats_container.appendChild(ranking)

            var clan = document.createElement("div")
            clan.classList.add("CoC_half")
            var clan_title = document.createElement("span")
            clan_title.classList.add("header")
            clan_title.appendChild(document.createTextNode("Clan"))
            clan.appendChild(clan_title)

            var clan_details = document.createElement("div")
            clan_details.classList.add("header")
            var image_clan = document.createElement("img")
            image_clan.src = this.clan_src
            image_clan.classList.add("CoC_image")
            clan_details.appendChild(image_clan)
            var clan_span = document.createElement("span")
            clan_span.appendChild(document.createTextNode(this.clan_name))
            clan_details.appendChild(clan_span)
            clan.appendChild(clan_details)

            stats_container.appendChild(clan)

            wrapper.appendChild(stats_container)
        } else {
            var wrapper = document.createElement("div");
            wrapper.innerHTML = 'Daten werden geladen...' + this.counter
            this.counter = this.counter + 1
        }
        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case 'GOT-PLAYER-STATS':
                this.playerName = payload.name
                this.trophies = payload.trophies
                this.loaded = true
                this.clan_name = payload.clan.name
                this.clan_src = payload.clan.badgeUrls.medium
                this.ranking_src = payload.league.iconUrls.medium
                this.updateDom()
                break
            default:
                this.updateDom()
                break
        }
    },

    sheduleUpdate: function() {
        setInterval(() => {
            this.getPlayerStats()
        }, this.config.updateInterval)
        this.getPlayerStats()
    }
})