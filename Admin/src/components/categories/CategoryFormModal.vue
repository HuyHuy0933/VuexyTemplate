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
      :title="category ? 'Edit Category' : 'Create Category'"
      @ok.prevent="submit"
      no-close-on-backdrop
    >
      <validation-observer ref="formRules">
        <b-form>
          <b-form-group>
            <label for="name">Tên:</label>
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
            <label for="priceUnit">Giá Decal/A4:</label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="priceUnit"
              rules="required"
            >
              <b-form-input
                id="priceUnit"
                v-model="input.priceUnit"
                :state="errors.length > 0 ? false : null"
                placeholder="Giá Decal/A4"
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
            <label for="status">Hoạt động:</label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="status"
              rules="required"
            >
              <b-form-select
                id="status"
                v-model="input.status"
                :options="statusOptions"
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
            <label for="description">Mô tả:</label>
            <b-form-textarea
              id="description"
              v-model="input.description"
              placeholder="Mô tả"
              rows="4"
            />
          </b-form-group>
          <b-form-group>
            <label for="url">Url:</label>
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
            <label for="Image">Image:</label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="image"
              :rules="category ? '' : 'required'"
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
                v-if="input.image || category"
                :src="
                  input.image
                    ? URL.createObjectURL(input.image)
                    : `${VUE_APP_API_BASE_HOST}/${category.image}`
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

<script src="./CategoryFormModal.ts"></script>
