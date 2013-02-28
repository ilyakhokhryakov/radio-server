Kigendan.Views.PlaylistWithTracksItem = Backbone.View.extend({

    template: JST['playlists/playlist_with_tracks_item'],

    tagName: 'tr',

    className: 'playlist-tracks-table-item',

    events: {
        'click a.remove-link': 'removeFromPlaylist'
    },

    initialize: function(options) {
        this.playlist = options.playlist;
    },

    render: function() {
        this.$el.html(this.template({ track: this.model }));
        if (this.model.isRemovedFromPlaylist) {
            this.$el.addClass('playlist-tracks-table-item-removed');
        } else {
            this.$el.removeClass('playlist-tracks-table-item-removed');
        }
        return this;
    },

    removeFromPlaylist: function(event) {
        event.preventDefault();

        this.model.isRemovedFromPlaylist = true;

        if (this.model.searchItemView) {
            this.model.isAddedToPlaylist = false;
            this.model.searchItemView.render();
        }

        if (!(this.playlist.isNew())) {
            this.playlist.save();
        }

        this.render();
    }

});