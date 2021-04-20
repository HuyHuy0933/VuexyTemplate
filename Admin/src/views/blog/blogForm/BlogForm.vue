<template>
  <b-card class="blog-form">
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
                      :forLabel="'description'"
                      :text="'Mô tả'"
                    ></custom-label>
                    <b-form-textarea
                      id="description"
                      v-model="input.description"
                      placeholder="Mô tả"
                      rows="4"
                    />
                  </b-form-group>
                </b-col>
                <b-col md="6" lg="12">
                  <b-form-group>
                    <custom-label
                      :forLabel="'selUrl'"
                      :text="'Seo Url'"
                    ></custom-label>
                    <b-form-input
                      id="seoUrl"
                      v-model="input.seoUrl"
                      placeholder="Seo Url"
                    />
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
                      :text="'Mô tả Seo Url'"
                    ></custom-label>
                    <b-form-textarea
                      id="metaDescription"
                      v-model="input.metaDescription"
                      placeholder="Mô tả Seo Meta"
                      rows="4"
                    />
                  </b-form-group>
                </b-col>
                <b-col md="6" lg="12">
                  <b-form-group>
                    <custom-label
                      :forLabel="'image'"
                      :text="'Hình ảnh'"
                      :required="true"
                    ></custom-label>
                    <validation-provider
                      v-slot="{ errors, failedRules }"
                      name="image"
                      :rules="blog ? '' : 'required'"
                    >
                      <b-form-file
                        :state="errors.length > 0 ? false : null"
                        name="images"
                        accept="image/*"
                        :value="input.image"
                        @change="imageChange"
                      />

                      <b-img
                        thumbnail
                        class="mt-1 w-25"
                        v-if="input.image || blog"
                        :src="
                          input.image
                            ? URL.createObjectURL(input.image)
                            : `${VUE_APP_API_BASE_HOST}/${blog.image}`
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
                </b-col>
              </b-row>
            </b-col>
            <b-col md="12" lg="8">
              <b-form-group class="bf-text-editor">
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
              <b-link to="/blog-list">
                <b-button type="reset" variant="outline-secondary" class="mr-1">
                  Trờ về
                </b-button>
              </b-link>
              <b-button type="submit" variant="primary">Lưu</b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card-body>
  </b-card>
</template>

<style lang="scss">
@import '@core/scss/vue/libs/quill.scss';

.blog-form {
  .bf-text-editor {
    .quill-editor {
      .ql-container {
        height: 497px;
      }
    }
  }
}
</style>

<script src="./BlogForm.ts"></script>
