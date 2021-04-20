<template>
  <div>
    <b-modal
      ref="modal"
      id="modal"
      cancel-variant="outline-secondary"
      ok-title="Lưu"
      ok-only
      centered
      title="Chỉnh sửa"
      :ok-disabled="false"
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
            <custom-label
              :forLabel="'settingValue'"
              :text="'Giá trị'"
              :required="true"
            ></custom-label>
            <b-form-textarea
              id="settingValue"
              v-model="input.settingValue"
              placeholder="Setting value"
              rows="4"
            />
          </b-form-group>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script src="./SettingFormModal.ts"></script>
