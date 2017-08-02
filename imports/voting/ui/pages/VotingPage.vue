<template>
    <div class="voting-page">
        <proposal-filter />
        <div class="main-content">
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