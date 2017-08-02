<template>
    <div class="voting-page page">
        <proposal-filter />
        <div class="voting-content">
            <div class="container">
                <div class="row-h">
                    <div class="column md-7">
                        <proposal-list />
                    </div>
                    <aside class="column md-3">
                        <history-list />
                    </aside>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProposalFilter from '../components/ProposalFilter.vue';
    import ProposalList from '../components/ProposalList.vue';
    import HistoryList from '../components/HistoryList.vue';

    export default {
      components: {
        ProposalFilter,
        ProposalList,
        HistoryList,
      },
    }
</script>

<style lang="scss">
    @import "/imports/core/ui/styles/mixins";

    .voting-page {
        @include flexbox;
        @include flex-direction(column);
    }
    .voting-content {
        @include flex-grow(1);
        @include flexbox;
        @include flex-direction(column);
        .container {
            position: relative;
            @include flex-grow(1);
            .row-h {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                > div {
                    overflow-y: scroll;
                }
            }
        }
    }
</style>