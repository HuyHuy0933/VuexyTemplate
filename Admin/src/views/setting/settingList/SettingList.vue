<template>
  <b-card>
    <b-card-header>
      <h4 class="mb-0">Cấu hình Công Ty</h4>
      <b-card-text class="font-medium-5 mb-0">
        <setting-form-modal ref="settingFormModal" />
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
          <span v-if="props.column.field === 'name'" class="text-nowrap">
            <span>{{ props.row.name }}</span>
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
              </b-dropdown>
            </span>
          </span>

          <span v-else>
            {{ props.formattedRow[props.column.field] }}
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

<script src="./SettingList.ts"></script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
