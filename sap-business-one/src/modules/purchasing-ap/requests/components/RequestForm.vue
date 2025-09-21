<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Purchase Request</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label for="series" class="block text-sm font-medium text-gray-700 mb-1">
            Series
          </label>
          <input
            id="series"
            v-model="formData.series"
            type="text"
            placeholder="Local Purchase"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="postingDate" class="block text-sm font-medium text-gray-700 mb-1">
            Posting Date *
          </label>
          <input
            id="postingDate"
            v-model="formData.postingDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="validTill" class="block text-sm font-medium text-gray-700 mb-1">
            Valid Till
          </label>
          <input
            id="validTill"
            v-model="formData.validTill"
            type="date"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="documentDate" class="block text-sm font-medium text-gray-700 mb-1">
            Document Date *
          </label>
          <input
            id="documentDate"
            v-model="formData.documentDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="requiredDate" class="block text-sm font-medium text-gray-700 mb-1">
            Required Date
          </label>
          <input
            id="requiredDate"
            v-model="formData.requiredDate"
            type="date"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="requestType" class="block text-sm font-medium text-gray-700 mb-1">
            Request Type
          </label>
          <input
            id="requestType"
            v-model="formData.requestType"
            type="text"
            placeholder="Item"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <input
            id="currency"
            v-model="formData.currency"
            type="text"
            placeholder="Enter currency"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <!-- Remarks -->
        <div class="col-span-full mt-4">
          <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">
            Remarks
          </label>
          <textarea
            id="remarks"
            v-model="formData.remarks"
            rows="2"
            placeholder="text box to write details, max 254 characters"
            maxlength="254"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <h4 class="text-lg font-medium text-gray-900">Line Items</h4>
          <div class="flex items-center space-x-2">
            <label for="itemType" class="text-sm font-medium text-gray-700">
              Type:
            </label>
            <select
              id="itemType"
              v-model="formData.type"
              class="text-sm border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-400 text-gray-900"
            >
              <option value="Item">Item</option>
              <option value="Service">Service</option>
            </select>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
            type="button"
            @click="handleImportExcel"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            Import Excel
          </button>
          <button
            type="button"
            @click="handleSampleExcel"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Sample Excel
          </button>
          <button
            type="button"
            @click="handleCopyFrom"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy From
          </button>
          <button
            type="button"
            @click="addLineItem"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Line
          </button>
        </div>
      </div>

      <div class="w-full overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <!-- Item Type Headers -->
          <thead v-if="formData.type === 'Item'" class="bg-gray-50">
            <tr>
              <th class="w-20 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Item No.
              </th>
              <th class="w-32 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Qty
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                UoM
              </th>
              <th class="w-20 px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Disc%
              </th>
              <th class="w-20 px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Tax
              </th>
              <th class="w-16 px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Tax Amt
              </th>
              <th class="w-20 px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Total Inc
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dim1
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dim2
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dim3
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dim4
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                WH
              </th>
              <th class="w-12 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">

              </th>
            </tr>
          </thead>

          <!-- Service Type Headers -->
          <thead v-else class="bg-gray-50">
            <tr>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Sno.
              </th>
              <th class="w-40 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Discount
              </th>
              <th class="w-24 px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Total (LC)
              </th>
              <th class="w-24 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Tax Code
              </th>
              <th class="w-20 px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Tax Amount
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dimension 1
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dimension 2
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dimension 3
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dimension 4
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Warehouse
              </th>
              <th class="w-12 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">

              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Item Type Rows -->
            <tr v-if="formData.type === 'Item'" v-for="(item, index) in formData.lineItems" :key="index">
              <td class="px-2 py-1">
                <input
                  v-model="item.itemCode"
                  type="text"
                  placeholder="Code"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <textarea
                  v-model="item.description"
                  placeholder="Description"
                  rows="2"
                  class="w-full min-w-[140px] text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700 resize-none"
                  @input="handleLineItemInput(index)"
                ></textarea>
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="item.quantity"
                  type="number"
                  step="1"
                  min="0"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateLineTotal(index); handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="item.uom"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="handleLineItemInput(index)"
                >
                  <option value="pcs">pcs</option>
                  <option value="kg">kg</option>
                  <option value="box">box</option>
                  <option value="ltr">ltr</option>
                </select>
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="item.unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateLineTotal(index); handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="item.discount"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateLineTotal(index); handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1 text-right text-xs text-gray-900">
                {{ formatCurrency(getLineTotal(item)) }}
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="item.taxCode"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="updateTaxRate(index); handleLineItemInput(index)"
                >
                  <option value="EXEMPT">EX</option>
                  <option value="VAT-18">18</option>
                  <option value="VAT-0">0</option>
                </select>
              </td>
              <td class="px-2 py-1 text-right text-xs text-gray-900">
                {{ formatCurrency(getTaxAmount(item)) }}
              </td>
              <td class="px-2 py-1 text-right text-xs text-gray-900">
                {{ formatCurrency(getInclusiveTotal(item)) }}
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension1"
                  type="text"
                  placeholder="Dim1"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension2"
                  type="text"
                  placeholder="Dim2"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension3"
                  type="text"
                  placeholder="Dim3"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension4"
                  type="text"
                  placeholder="Dim4"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.warehouse"
                  type="text"
                  placeholder="WH"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <button
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-600 hover:text-red-900 text-xs"
                >
                  ✕
                </button>
              </td>
            </tr>

            <!-- Service Type Rows -->
            <tr v-else v-for="(service, index) in formData.serviceItems" :key="'service-' + index">
              <td class="px-2 py-1 text-center text-xs text-gray-900">
                {{ service.sno }}
              </td>
              <td class="px-2 py-1">
                <textarea
                  v-model="service.description"
                  placeholder="Description"
                  rows="2"
                  class="w-full min-w-[180px] text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700 resize-none"
                  @input="handleServiceItemInput(index)"
                ></textarea>
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="service.discount"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="0.00"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateServiceTotal(index); handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="service.total"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateServiceTotal(index); handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="service.taxCode"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="updateServiceTaxRate(index); handleServiceItemInput(index)"
                >
                  <option value="EXEMPT">EX</option>
                  <option value="VAT-18">18</option>
                  <option value="VAT-0">0</option>
                </select>
              </td>
              <td class="px-2 py-1 text-right text-xs text-gray-900">
                {{ formatCurrency(getServiceTaxAmount(service)) }}
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension1"
                  type="text"
                  placeholder="Dim1"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension2"
                  type="text"
                  placeholder="Dim2"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension3"
                  type="text"
                  placeholder="Dim3"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension4"
                  type="text"
                  placeholder="Dim4"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.warehouse"
                  type="text"
                  placeholder="WH"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <button
                  type="button"
                  @click="removeServiceItem(index)"
                  class="text-red-600 hover:text-red-900 text-xs"
                >
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals Summary -->
      <div class="mt-6 border-t border-gray-200 pt-4">
        <div class="flex justify-end">
          <div class="w-80 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Subtotal:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Discount Total:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(discountTotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Freight Type:</span>
              <select v-model="formData.freightType" class="w-32 text-sm border-gray-300 rounded-md text-gray-900 focus:border-gray-400 focus:ring-gray-400">
                <option value="Air Freight">Air Freight</option>
                <option value="Sea Freight">Sea Freight</option>
                <option value="Road">Road</option>
              </select>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Freight Amount:</span>
              <input
                v-model.number="formData.freightAmount"
                type="number"
                step="0.01"
                min="0"
                class="w-32 text-sm border-gray-300 rounded-md text-right text-gray-900 focus:border-gray-400 focus:ring-gray-400"
                placeholder="0.00"
              />
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Tax Total:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(totalTax) }}</span>
            </div>
            <div class="flex justify-between text-base font-bold border-t pt-2">
              <span class="text-gray-900">Total:</span>
              <span class="text-gray-900">{{ formatCurrency(total + (formData.freightAmount || 0)) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="!isFormValid"
        class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ props.initialData ? 'Update' : 'Create' }} Request
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { PurchaseRequestType, PurchaseRequestPriority, Currency } from '../types'
import type { PurchaseRequestFormData, PurchaseRequestLineItem } from '../types'

// Props
interface Props {
  initialData?: PurchaseRequestFormData
}

const props = withDefaults(defineProps<Props>(), {
  initialData: undefined,
})

// Emits
const emit = defineEmits<{
  submit: [data: PurchaseRequestFormData]
  cancel: []
}>()

// Form Data
const formData = ref<any>({
  series: 'Local Purchase',
  postingDate: '',
  validTill: '',
  documentDate: '',
  requiredDate: '',
  requestType: 'Item',
  currency: 'USD',
  remarks: 'Purchase Request created for procurement needs',
  type: 'Item',
  serviceItems: [
    { sno: 1, description: '', discount: 0, total: 0, taxCode: 'EXEMPT', taxAmount: 0, dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '' },
    { sno: 2, description: '', discount: 0, total: 0, taxCode: 'EXEMPT', taxAmount: 0, dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '' },
    { sno: 3, description: '', discount: 0, total: 0, taxCode: 'EXEMPT', taxAmount: 0, dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '' },
    { sno: 4, description: '', discount: 0, total: 0, taxCode: 'EXEMPT', taxAmount: 0, dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '' },
    { sno: 5, description: '', discount: 0, total: 0, taxCode: 'EXEMPT', taxAmount: 0, dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '' },
  ],
  lineItems: [
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, discount: 0, taxCode: 'EXEMPT', taxRate: 0, uom: 'pcs', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '', lineTotal: 0 },
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, discount: 0, taxCode: 'EXEMPT', taxRate: 0, uom: 'pcs', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '', lineTotal: 0 },
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, discount: 0, taxCode: 'EXEMPT', taxRate: 0, uom: 'pcs', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '', lineTotal: 0 },
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, discount: 0, taxCode: 'EXEMPT', taxRate: 0, uom: 'pcs', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '', lineTotal: 0 },
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, discount: 0, taxCode: 'EXEMPT', taxRate: 0, uom: 'pcs', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '', lineTotal: 0 },
  ],
  freightType: 'Air Freight',
  freightAmount: 0,
})

// Supporting Data
const requestTypes = Object.values(PurchaseRequestType)
const requestPriorities = Object.values(PurchaseRequestPriority)
const currencies = Object.values(Currency)

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = {
        ...newData,
        lineItems: newData.lineItems.map((item) => ({
          ...item,
          itemName: item.description,
          taxCode: item.taxCode || '',
          taxPercent: 0,
          accountCode: '',
          costCenter: item.costCenter || '',
          projectCode: item.projectCode || '',
          warehouseCode: item.warehouseCode || '',
          requestedDate: item.requestedDate || '',
          priority: item.priority || PurchaseRequestPriority.MEDIUM,
        })),
      }
    }
  },
  { immediate: true },
)

// Set default dates
onMounted(() => {
  if (!props.initialData) {
    const today = new Date()
    const dueDate = new Date()
    dueDate.setDate(today.getDate() + 30) // Default to 30 days from now

    formData.value.postingDate = today.toISOString().split('T')[0]
    formData.value.documentDate = today.toISOString().split('T')[0]
    formData.value.requiredDate = dueDate.toISOString().split('T')[0]
  }
})

// Line Items Management
const addLineItem = () => {
  if (formData.value.type === 'Item') {
    formData.value.lineItems.push({
      itemCode: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      taxCode: 'EXEMPT',
      taxRate: 0,
      uom: 'pcs',
      dimension1: '',
      dimension2: '',
      dimension3: '',
      dimension4: '',
      warehouse: '',
      lineTotal: 0,
    })
  } else {
    addServiceItem()
  }
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
}

const calculateLineTotal = (index: number) => {
  // Trigger reactivity by updating the line item
  const item = formData.value.lineItems[index]
  formData.value.lineItems[index] = { ...item }
}

const getLineTotal = (item: { quantity: number; unitPrice: number; discount: number }): number => {
  const subtotal = item.quantity * item.unitPrice
  const discountAmount = subtotal * (item.discount / 100)
  return subtotal - discountAmount
}

const getTaxAmount = (item: { quantity: number; unitPrice: number; discount: number; taxCode: string }): number => {
  const exclusiveTotal = getLineTotal(item)
  const taxRate = getTaxRate(item.taxCode)
  return exclusiveTotal * (taxRate / 100)
}

const getInclusiveTotal = (item: { quantity: number; unitPrice: number; discount: number; taxCode: string }): number => {
  return getLineTotal(item) + getTaxAmount(item)
}

const getTaxRate = (taxCode: string): number => {
  switch (taxCode) {
    case 'VAT-18': return 18
    case 'VAT-0': return 0
    case 'EXEMPT': return 0
    default: return 0
  }
}

// Calculations
const subtotal = computed(() => {
  const itemsTotal = formData.value.lineItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)

  const servicesTotal = formData.value.serviceItems.reduce((sum, service) => {
    return sum + (service.total || 0)
  }, 0)

  return itemsTotal + servicesTotal
})

const totalTax = computed(() => {
  const itemsTax = formData.value.lineItems.reduce((sum, item) => {
    return sum + getTaxAmount(item)
  }, 0)

  const servicesTax = formData.value.serviceItems.reduce((sum, service) => {
    return sum + getServiceTaxAmount(service)
  }, 0)

  return itemsTax + servicesTax
})
const discountTotal = computed(() => {
  const itemsDiscount = formData.value.lineItems.reduce((sum, item) => {
    const lineSubtotal = item.quantity * item.unitPrice
    return sum + lineSubtotal * (item.discount / 100)
  }, 0)

  const servicesDiscount = formData.value.serviceItems.reduce((sum, service) => {
    return sum + (service.total * (service.discount / 100) || 0)
  }, 0)

  return itemsDiscount + servicesDiscount
})

const total = computed(() => {
  return subtotal.value + totalTax.value
})

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.postingDate &&
    formData.value.documentDate &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every(
      (item) => item.itemCode && item.description && item.quantity > 0 && item.unitPrice >= 0,
    )
  )
})

// Form Submission
const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', formData.value)
  }
}

// Utility Functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount)
}

const formatRequestType = (type: PurchaseRequestType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPriority = (priority: PurchaseRequestPriority): string => {
  return priority.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

// Additional functions for the new UI
const handleLineItemInput = (index: number) => {
  const item = formData.value.lineItems[index]
  if (!hasLineItemData(item) && index === formData.value.lineItems.length - 1) {
    addLineItem()
  }
}

const handleServiceItemInput = (index: number) => {
  const service = formData.value.serviceItems[index]
  if (!hasServiceItemData(service) && index === formData.value.serviceItems.length - 1) {
    addServiceItem()
  }
}

const hasLineItemData = (item: any): boolean => {
  return item.itemCode.trim() !== '' ||
         item.description.trim() !== '' ||
         item.quantity > 0 ||
         item.unitPrice > 0 ||
         item.discount > 0 ||
         (item.dimension1 && item.dimension1.trim() !== '') ||
         (item.dimension2 && item.dimension2.trim() !== '') ||
         (item.dimension3 && item.dimension3.trim() !== '') ||
         (item.dimension4 && item.dimension4.trim() !== '') ||
         (item.warehouse && item.warehouse.trim() !== '')
}

const hasServiceItemData = (service: any): boolean => {
  return service.description.trim() !== '' ||
         service.total > 0 ||
         service.discount > 0 ||
         service.dimension1.trim() !== '' ||
         service.dimension2.trim() !== '' ||
         service.dimension3.trim() !== '' ||
         service.dimension4.trim() !== '' ||
         service.warehouse.trim() !== ''
}

const addServiceItem = () => {
  const nextSno = formData.value.serviceItems.length + 1
  formData.value.serviceItems.push({
    sno: nextSno,
    description: '',
    discount: 0,
    total: 0,
    taxCode: 'EXEMPT',
    taxAmount: 0,
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
    warehouse: '',
  })
}

const removeServiceItem = (index: number) => {
  if (formData.value.serviceItems.length > 5) {
    formData.value.serviceItems.splice(index, 1)
    // Renumber the remaining items
    formData.value.serviceItems.forEach((item: any, idx: number) => {
      item.sno = idx + 1
    })
  } else if (formData.value.serviceItems.length > 1) {
    // Clear the item data but keep minimum 5 rows
    formData.value.serviceItems[index] = {
      sno: index + 1,
      description: '',
      discount: 0,
      total: 0,
      taxCode: 'EXEMPT',
      taxAmount: 0,
      dimension1: '',
      dimension2: '',
      dimension3: '',
      dimension4: '',
      warehouse: '',
    }
  }
}

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  item.taxRate = getTaxRate(item.taxCode)
  calculateLineTotal(index)
}

const updateServiceTaxRate = (index: number) => {
  const service = formData.value.serviceItems[index]
  service.taxRate = getTaxRate(service.taxCode)
}


const getServiceTax = (service: any): number => {
  const taxRate = getTaxRate(service.taxCode)
  return service.total * (taxRate / 100)
}

const getServiceTaxAmount = (service: any): number => {
  const taxRate = getTaxRate(service.taxCode)
  return service.total * (taxRate / 100)
}

const calculateServiceTotal = (index: number) => {
  // Trigger reactivity by updating the service item
  const service = formData.value.serviceItems[index]
  formData.value.serviceItems[index] = { ...service }
}

// Excel Import/Export handlers
const handleImportExcel = () => {
  console.log('Import Excel functionality')
  // This would typically open a file dialog and process the Excel file
}

const handleSampleExcel = () => {
  console.log('Download sample Excel template')
  // This would typically download a sample Excel template
}

const handleCopyFrom = () => {
  console.log('Copy from another document')
  // This would typically open a dialog to select a document to copy from
}
</script>
