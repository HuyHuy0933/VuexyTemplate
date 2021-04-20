<template>
  <b-card class="product-form">
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
                      :forLabel="'price'"
                      :text="'Giá Decal/A4'"
                      :required="true"
                    ></custom-label>
                    <validation-provider
                      v-slot="{ errors, failedRules }"
                      name="price"
                      rules="required"
                    >
                      <b-form-input
                        id="price"
                        v-model="input.price"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Giá Decal/A4"
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
                </b-col>
                <b-col md="6" lg="12">
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
                        :options="productStatus"
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
                </b-col>
                <b-col md="6" lg="12">
                  <b-form-group>
                    <custom-label
                      :forLabel="'selUrl'"
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
                      :required="true"
                    ></custom-label>
                    <validation-provider
                      v-slot="{ errors, failedRules }"
                      name="metaTitle"
                      rules="required"
                    >
                      <b-form-input
                        id="metaTitle"
                        v-model="input.metaTitle"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Tiêu đề Seo Meta"
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
                  <b-form-group class="pf-images">
                    <custom-label
                      :forLabel="'image'"
                      :text="'Hình ảnh'"
                      :required="true"
                    ></custom-label>
                    <validation-provider
                      v-slot="{ errors, failedRules }"
                      name="images"
                      :rules="
                        product && input.imageLinks.length > 0 ? '' : 'required'
                      "
                    >
                      <b-form-file
                        :state="errors.length > 0 ? false : null"
                        name="images"
                        accept="image/*"
                        :value="input.imageFiles"
                        @change="imageChange"
                      />

                      <small
                        class="text-danger"
                        v-if="failedRules.hasOwnProperty('required')"
                      >
                        Vui lòng nhập
                      </small>
                    </validation-provider>
                    <div
                      v-if="
                        input.imageFiles.length > 0 ||
                        input.imageLinks.length > 0
                      "
                      class="d-inline-flex flex-wrap"
                    >
                      <div
                        class="img-item w-25"
                        v-for="img in input.imageLinks"
                        :key="img"
                      >
                        <b-img
                          thumbnail
                          class="mt-1 w-100"
                          :src="`${VUE_APP_API_BASE_HOST}/${img}`"
                        />
                        <feather-icon
                          icon="XCircleIcon"
                          size="21"
                          @click="deleteImgLink(img)"
                        />
                      </div>
                      <div
                        class="img-item w-25"
                        v-for="img in input.imageFiles"
                        :key="img.name"
                      >
                        <b-img
                          thumbnail
                          class="mt-1 w-100"
                          :src="URL.createObjectURL(img)"
                        />
                        <feather-icon
                          icon="XCircleIcon"
                          size="21"
                          @click="deleteImgFile(img)"
                        />
                      </div>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col md="12" lg="8">
              <b-form-group class="pf-text-editor">
                <custom-label
                  :forLabel="'description'"
                  :text="'Mô tả'"
                ></custom-label>
                <quill-editor id="Description" v-model="input.description" />
              </b-form-group>
            </b-col>
            <b-col xs-12 class="text-right">
              <b-link to="/product-list">
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

.product-form {
  .pf-images {
    .img-item {
      position: relative;
      margin-right: 15px;

      :hover {
        cursor: pointer;
      }

      img {
        height: 70px;
      }

      svg {
        position: absolute;
        top: 7px;
        right: -7px;
        color: #7367f0;
        z-index: 1000;

        :hover {
          cursor: pointer;
        }
      }
    }
  }

  .pf-text-editor {
    .quill-editor {
      .ql-container {
        height: 497px;
      }
    }
  }
}
</style>

<script src="./ProductForm.ts"></script>
