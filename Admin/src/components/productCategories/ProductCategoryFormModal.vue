<template>
  <div>
    <section v-on:click="openCreateModal">
      <slot></slot>
    </section>
    <b-modal
      ref="modal"
      id="modal"
      cancel-variant="outline-secondary"
      ok-title="Save"
      ok-only
      centered
      :title="productCategory ? 'Chỉnh sửa' : 'Thêm mới'"
      @ok.prevent="submit"
      no-close-on-backdrop
    >
      <validation-observer ref="formRules">
        <b-form>
          <b-form-group>
            <custom-label
              :forLabel="'name'"
              :text="'Tên'"
              :required="true"
            ></custom-label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="name"
              rules="required"
            >
              <b-form-input
                id="name"
                v-model="input.name"
                :state="errors.length > 0 ? false : null"
                placeholder="Name"
              />
              <small
                class="text-danger"
                v-if="failedRules.hasOwnProperty('required')"
              >
                Vui lòng nhập
              </small>
            </validation-provider>
          </b-form-group>
          <b-form-group>
            <custom-label
              :forLabel="'url'"
              :text="'Url'"
              :required="true"
            ></custom-label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="url"
              rules="required"
            >
              <b-form-input
                id="url"
                v-model="input.url"
                :state="errors.length > 0 ? false : null"
                placeholder="Url"
              />
              <small
                class="text-danger"
                v-if="failedRules.hasOwnProperty('required')"
              >
                Vui lòng nhập
              </small>
            </validation-provider>
          </b-form-group>
          <b-form-group>
            <custom-label
              :forLabel="'status'"
              :text="'Hoạt động'"
              :required="true"
            ></custom-label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="status"
              rules="required"
            >
              <b-form-select
                id="status"
                v-model="input.status"
                :options="productCategoryStatus"
                :state="errors.length > 0 ? false : null"
              />
              <small
                class="text-danger"
                v-if="failedRules.hasOwnProperty('required')"
              >
                Vui lòng chọn
              </small>
            </validation-provider>
          </b-form-group>
          <b-form-group>
            <custom-label
              :forLabel="'image'"
              :text="'Hình ảnh'"
              :required="true"
            ></custom-label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="image"
              :rules="productCategory ? '' : 'required'"
            >
              <b-form-file
                :value="input.image"
                :state="errors.length > 0 ? false : null"
                name="Image"
                accept="image/*"
                @change="imageChange"
              />
              <b-img
                thumbnail
                class="mt-2 w-100"
                v-if="input.image || productCategory"
                :src="
                  input.image
                    ? URL.createObjectURL(input.image)
                    : `${VUE_APP_API_BASE_HOST}/${productCategory.image}`
                "
              />
              <small
                class="text-danger"
                v-if="failedRules.hasOwnProperty('required')"
              >
                Vui lòng nhập
              </small>
            </validation-provider>
          </b-form-group>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script src="./ProductCategoryFormModal.ts"></script>
