import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messagess', {
    store: () => ({
        message: [],
        receivedMessage: []
    }),
    actions: {
        updateMessage(value) {
            this.message = value;
        },
        updateReceivedMessage(value) {
            this.receivedMessage = value;
        },
    }
})

export const useRoom = defineStore('room', {
    state: () => ({
        list: [
            {
                'id': 1,
                'name': 'WARGA NEGARA INDONESIA',
            },
            {
                'id': 2,
                'name': 'Komunitas wong edan bebas',
            },
            {
                'id': 3,
                'name': 'Land of Dawn',
            },

        ],
        current: 1,
        selected: 1,
    }),
    actions: {
        selectRoom(value) {
            this.selected = value;
        },
        updateCurrent(value) {
            this.current = value;
        },
    },
})

export const loadingState = defineStore('loading', {
    state: () => ({
        loading: false,
    }),
    actions: {
        setLoading(value) {
            this.loading = value;
        }
    }
})