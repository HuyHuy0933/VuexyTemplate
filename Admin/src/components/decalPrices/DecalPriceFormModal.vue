<template>
  <div>
    <b-modal
      ref="modal"
      id="modal"
      cancel-variant="outline-secondary"
      ok-title="Save"
      ok-only
      centered
      title="Chỉnh sửa"
      @ok.prevent="submit"
      no-close-on-backdrop
    >
      <validation-observer ref="formRules">
        <b-form>
          <b-form-group>
            <custom-label
              :forLabel="'description'"
              :text="'Mô tả'"
              :required="true"
            ></custom-label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="description"
              rules="required"
            >
              <b-form-input
                id="description"
                v-model="input.description"
                :state="errors.length > 0 ? false : null"
                placeholder="Mô tả"
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
              :forLabel="'quantity'"
              :text="'Số tờ A4'"
              :required="true"
            ></custom-label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="quantity"
              rules="required"
            >
              <b-form-input
                id="quantity"
                v-model="input.quantity"
                :state="errors.length > 0 ? false : null"
                placeholder="Số tờ A4"
                type="number"
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
              :forLabel="'printPrice'"
              :text="'Giá in'"
              :required="true"
            ></custom-label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="printPrice"
              rules="required"
            >
              <b-form-input
                id="printPrice"
                v-model="input.printPrice"
                :state="errors.length > 0 ? false : null"
                placeholder="Giá in"
                type="number"
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
              :forLabel="'cutPrice'"
              :text="'Giá bế'"
              :required="true"
            ></custom-label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="cutPrice"
              rules="required"
            >
              <b-form-input
                id="cutPrice"
                v-model="input.cutPrice"
                :state="errors.length > 0 ? false : null"
                placeholder="Giá bế"
                type="number"
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
              :forLabel="'machiningPrice'"
              :text="'Giá cán màng'"
              :required="true"
            ></custom-label>
            <validation-provider
              v-slot="{ errors, failedRules }"
              name="machiningPrice"
              rules="required"
            >
              <b-form-input
                id="machiningPrice"
                v-model="input.machiningPrice"
                :state="errors.length > 0 ? false : null"
                placeholder="Giá cán màng"
                type="number"
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

<script src="./DecalPriceFormModal.ts"></script>
