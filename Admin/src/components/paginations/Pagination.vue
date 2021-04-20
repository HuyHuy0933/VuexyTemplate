<template>
  <div class="d-flex justify-content-between flex-wrap">
    <div class="d-flex align-items-center mb-0 mt-1">
      <b-form-select
        :value="itemsPerPage"
        :options="itemsPerPageOptions"
        class="mr-1"
        @input="itemPerPageChange"
      />
      <span class="text-nowrap">There are {{ totalRows }} entries</span>
    </div>
    <div v-if="totalRows > itemsPerPage">
      <b-pagination
        :value="page ? page : 1"
        :total-rows="totalRows"
        :per-page="itemsPerPage"
        first-number
        last-number
        align="right"
        prev-class="prev-item"
        next-class="next-item"
        class="mt-1 mb-0"
        @input="pageChange"
      >
        <template #prev-text>
          <feather-icon icon="ChevronLeftIcon" size="18" />
        </template>
        <template #next-text>
          <feather-icon icon="ChevronRightIcon" size="18" />
        </template>
      </b-pagination>
    </div>
  </div>
</template>

<script src="./Pagination.ts"></script>
