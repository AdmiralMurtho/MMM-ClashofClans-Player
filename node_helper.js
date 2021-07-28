var NodeHelper = require('node_helper')
var request = require('request')

module.exports = NodeHelper.create({
    start: function() {
        console.log('MMM-ClashofClans-Player helper, started...')

        this.PlayerName = ''
        this.trophies = null
    },

    getPlayerStats: function(payload) {
        //var that = this
        this.url = 'https://api.clashofclans.com/v1/players/%23YQLQ902Y'
        this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjMyYjcyMWQxLTYwNzAtNGI0YS04OTg0LTM2ZGE3ZTRhMzg3ZCIsImlhdCI6MTYyNzM4NzE1OCwic3ViIjoiZGV2ZWxvcGVyLzdhY2MxMWJkLTg0ZmQtNjNjZS1iN2QyLTY0Y2NhZTc1NWIxMCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjc5LjIwNy4xNTcuMTk0Il0sInR5cGUiOiJjbGllbnQifV19.I6AylkHJQmKiAtWUj-AmmAOruuKv0gk6J4BKk0VWjuX0fa1l7S8JWtJDJOnrt4xbKcOQn6ij0kdeKkyicdKTaw'

        request({
            url: this.url,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }, (error, response, body) => {
            var result = null;
            if(!error && response.statusCode == 200){
                result = JSON.parse(body)
            } else {
                result = null
            }
            console.log("Name: " + result.name)
            this.sendSocketNotification('GOT-PLAYER-STATS', result)
        })
    },

    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case 'GET-PLAYER-STATS':
                this.getPlayerStats(payload)
                break
            default:
                break
        }
    }
})

