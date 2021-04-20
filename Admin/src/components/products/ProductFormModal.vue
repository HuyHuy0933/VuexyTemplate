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
      :title="product ? 'Edit Product' : 'Create Product'"
      :ok-disabled="false"
      @ok.prevent="submit"
      no-close-on-backdrop
    >
      <validation-observer ref="formRules">
        <b-form>
          <b-form-group>
            <label for="name">Name:</label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="Name"
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
            <label for="description">Description:</label>
            <validation-provider
              v-slot="{ failedRules }"
              name="Description"
              rules="required"
            >
              <quill-editor id="Description" :options="snowOption" />
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

<style lang="scss">
@import '@core/scss/vue/libs/quill.scss';
</style>

<script src="./ProductFormModal.ts"></script>
