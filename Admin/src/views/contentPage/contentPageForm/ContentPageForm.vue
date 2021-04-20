<template>
  <b-card>
    <b-card-header>
      <h4 class="mb-0">Thêm mới</h4>
    </b-card-header>
    <b-card-body>
      <validation-observer ref="formRules">
        <b-form @submit.prevent="submit">
          <b-row>
            <b-col md="12" lg="4">
              <b-row>
                <b-col md="6" lg="12">
                  <b-form-group>
                    <custom-label
                      :forLabel="'title'"
                      :text="'Tiêu đề'"
                      :required="true"
                    ></custom-label>
                    <validation-provider
                      v-slot="{ errors, failedRules }"
                      name="title"
                      rules="required"
                    >
                      <b-form-input
                        id="title"
                        v-model="input.title"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Tên"
                      />
                      <small
                        class="text-danger"
                        v-if="failedRules.hasOwnProperty('required')"
                      >
                        Vui lòng nhập
                      </small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6" lg="12">
                  <b-form-group>
                    <custom-label
                      :forLabel="'seoUrl'"
                      :text="'Seo Url'"
                      :required="true"
                    ></custom-label>
                    <validation-provider
                      v-slot="{ errors, failedRules }"
                      name="seoUrl"
                      rules="required"
                    >
                      <b-form-input
                        id="seoUrl"
                        v-model="input.seoUrl"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Seo Url"
                      />
                      <small
                        class="text-danger"
                        v-if="failedRules.hasOwnProperty('required')"
                      >
                        Vui lòng nhập
                      </small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6" lg="12">
                  <b-form-group>
                    <custom-label
                      :forLabel="'metaTitle'"
                      :text="'Tiêu đề Seo Meta'"
                    ></custom-label>
                    <b-form-input
                      id="metaTitle"
                      v-model="input.metaTitle"
                      placeholder="Tiêu đề Seo Meta"
                    />
                  </b-form-group>
                </b-col>
                <b-col md="6" lg="12">
                  <b-form-group>
                    <custom-label
                      :forLabel="'metaDescription'"
                      :text="'Mô tả Seo Meta'"
                      :required="true"
                    ></custom-label>
                    <b-form-textarea
                      id="metaDescription"
                      v-model="input.metaDescription"
                      placeholder="Mô tả Seo Meta"
                      rows="4"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col md="12" lg="8">
              <b-form-group>
                <custom-label
                  :forLabel="'content'"
                  :text="'Nội dung'"
                  :required="true"
                ></custom-label>
                <validation-provider
                  v-slot="{ failedRules }"
                  name="content"
                  rules="required"
                >
                  <quill-editor id="content" v-model="input.content" />
                  <small
                    class="text-danger"
                    v-if="failedRules.hasOwnProperty('required')"
                  >
                    Vui lòng nhập
                  </small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col xs-12 class="text-right">
              <b-link to="/content-page-list">
                <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  type="reset"
                  variant="outline-secondary"
                  class="mr-1"
                >
                  Trờ về
                </b-button>
              </b-link>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
              >
                Lưu
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card-body>
  </b-card>
</template>

<style lang="scss">
@import '@core/scss/vue/libs/quill.scss';
</style>

<script src="./ContentPageForm.ts"></script>
