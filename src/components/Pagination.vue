<template>
    <div v-if="totalPages() > 0" class="pagination-wrapper">
        <span v-if="showPreviousLink()" class="pagination-btn" v-on:click="updatePage(currentPage - 1)">&lt;</span>
        <span class="page-counter">{{ currentPage + 1 }} van {{ totalPages() }}</span>
        <span v-if="showNextLink()" class="pagination-btn" v-on:click="updatePage(currentPage + 1)">&gt;</span>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        props: ['list', 'currentPage', 'pageSize'],
        methods: {
            updatePage(pageNumber) {
                this.$emit('page:update', pageNumber)
            },
            totalPages() {
                return Math.ceil(this.list.length / this.pageSize)
            },
            showPreviousLink() {
                return this.currentPage == 0 ? false : true;
            },
            showNextLink() {
                return this.currentPage == this.totalPages() - 1 ? false : true;
            }
        }
    }
</script>

<style scoped>
    .pagination-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .pagination-btn {
        cursor: pointer;
        font-weight: bold;
        font-size: 2em;
        color: rgba(58, 96, 208, 1);
    }

    .page-counter {
        font-size: 1.25em;
        margin-left: 1em;
        margin-right: 1em;
    }
</style>