<template>
  <b-card>
    <b-card-header>
      <h4 class="mb-0">Danh mục sản phẩm</h4>
      <b-card-text class="font-medium-5 mb-0">
        <product-category-form-modal ref="productCategoryFormModal">
          <b-button variant="primary">Thêm mới</b-button>
        </product-category-form-modal>
      </b-card-text>
    </b-card-header>
    <b-card-body>
      <div class="custom-search">
        <!-- advance search input -->
        <b-row>
          <b-col md="4">
            <b-form-group>
              <label>Search:</label>
              <b-form-input
                placeholder="Search"
                type="text"
                class="d-inline-block"
                v-model="listState.input.searchText"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <vue-good-table
        mode="remote"
        :isLoading.sync="listState.isLoading"
        @on-sort-change="
          (params) => sortChanges(params[0].field, params[0].type)
        "
        :columns="headers"
        :rows="listState.items"
        :pagination-options="{
          enabled: true
        }"
      >
        <template slot="table-row" slot-scope="props">
          <!-- Column: Image -->
          <span v-if="props.column.field === 'image'" class="text-nowrap">
            <b-img
              :src="`${VUE_APP_API_BASE_HOST}/${props.row.image}`"
              class="w-100"
            ></b-img>
          </span>

          <span v-else-if="props.column.field === 'status'">
            <b-badge
              variant="light-success"
              v-if="props.row.status === PRODUCT_CATEGORY_STATUS_ENUM.Active"
            >
              {{ displayProductCategoryStatus(props.row.status) }}
            </b-badge>
            <b-badge variant="light-danger" v-else>
              {{ displayProductCategoryStatus(props.row.status) }}
            </b-badge>
          </span>

          <!-- Column: Action -->
          <span v-else-if="props.column.field === '_action'">
            <span>
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item v-on:click="edit(props.row.id)">
                  <feather-icon icon="Edit2Icon" class="mr-50" />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item v-on:click="remove(props.row.id)">
                  <feather-icon icon="TrashIcon" class="mr-50" />
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </span>

          <!-- Column: Other -->
          <span v-else class="text-nowrap">
            <span>{{ props.row[props.column.field] }}</span>
          </span>
        </template>

        <!-- pagination -->
        <template slot="pagination-bottom">
          <Pagination
            :itemsPerPageOptions="itemsPerPageOptions"
            :itemsPerPage="listState.input.itemsPerPage"
            :page="listState.input.page"
            :totalRows="listState.itemCount"
            @items-per-page-change="
              (value) => updatePagination({ itemsPerPage: value })
            "
            @page-change="(value) => updatePagination({ page: value })"
          />
        </template>
      </vue-good-table>
    </b-card-body>
  </b-card>
</template>

<script src="./ProductCategoryList.ts"></script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
