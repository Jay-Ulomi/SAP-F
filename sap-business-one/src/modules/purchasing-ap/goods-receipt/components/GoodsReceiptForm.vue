<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Goods Receipt</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Series -->
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

        <!-- Posting Date -->
        <div>
          <label for="postingDate" class="block text-sm font-medium text-gray-700 mb-1">
            Posting Date *
          </label>
          <input
            id="postingDate"
            v-model="formData.postingDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900"
          />
        </div>

        <!-- Due Date -->
        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            id="dueDate"
            v-model="formData.dueDate"
            type="date"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900"
          />
        </div>

        <!-- Document Date -->
        <div>
          <label for="documentDate" class="block text-sm font-medium text-gray-700 mb-1">
            Document Date *
          </label>
          <input
            id="documentDate"
            v-model="formData.documentDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900"
          />
        </div>

<!-- Vendor Code -->
        <div>
          <label for="vendorCode" class="block text-sm font-medium text-gray-700 mb-1">
            Vendor Code
          </label>
          <input
            id="vendorCode"
            v-model="formData.vendorCode"
            type="text"
            placeholder="HCL-C0025"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <!-- Vendor Name -->
        <div>
          <label for="vendorName" class="block text-sm font-medium text-gray-700 mb-1">
            Vendor Name
          </label>
          <input
            id="vendorName"
            v-model="formData.vendorName"
            type="text"
            placeholder="Vendor Name"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <!-- Contact Person -->
        <div>
          <label for="contactPerson" class="block text-sm font-medium text-gray-700 mb-1">
            Contact Person
          </label>
          <input
            id="contactPerson"
            v-model="formData.contactPerson"
            type="text"
            placeholder="Contact Person"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <!-- Reference No -->
        <div>
          <label for="referenceNo" class="block text-sm font-medium text-gray-700 mb-1">
            Reference No.
          </label>
          <input
            id="referenceNo"
            v-model="formData.referenceNo"
            type="text"
            placeholder="001258"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <!-- Request Type -->
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

        <!-- Currency -->
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
            placeholder="Goods receipt created for received items"
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
            <label for="receiptType" class="text-sm font-medium text-gray-700">
              Type:
            </label>
            <select
              id="receiptType"
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
            </svg>
            Copy From
          </button>
        </div>
      </div>

      <div v-if="formData.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items added yet. Click "Add Line" to add items to this receipt.
      </div>

      <div v-else class="w-full overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
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
              <th class="w-14 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
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
              <th class="w-12 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
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
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
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
            <template v-if="formData.type === 'Item'">
            <tr v-for="(item, index) in formData.lineItems" :key="index">
              <td class="px-2 py-1">
                <input
                  v-model="item.itemCode"
                  type="text"
                  placeholder="Code"
                  class="w-20 text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <textarea
                  v-model="item.description"
                  placeholder="Description"
                  rows="2"
                  class="w-32 min-w-[140px] text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700 resize-none"
                  @input="handleLineItemInput(index)"
                ></textarea>
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="item.quantity"
                  type="number"
                  step="1"
                  min="0"
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateLineTotal(index); handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="item.uom"
                  class="w-14 text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
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
                  class="w-20 text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
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
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateLineTotal(index); handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1 text-right text-xs text-gray-900 font-medium">
                {{ formatCurrency(getLineTotal(item)) }}
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="item.taxCode"
                  class="w-12 text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="updateTaxRate(index); handleLineItemInput(index)"
                >
                  <option value="EXEMPT">EX</option>
                  <option value="VAT-18">18</option>
                  <option value="VAT-0">0</option>
                </select>
              </td>
              <td class="px-2 py-1 text-right text-xs text-gray-900 font-medium">
                {{ formatCurrency(getTaxAmount(item)) }}
              </td>
              <td class="px-2 py-1 text-right text-xs text-gray-900 font-semibold">
                {{ formatCurrency(getInclusiveTotal(item)) }}
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension1"
                  type="text"
                  placeholder="Dim"
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension2"
                  type="text"
                  placeholder="Dim"
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension3"
                  type="text"
                  placeholder="Dim"
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension4"
                  type="text"
                  placeholder="Dim"
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.warehouse"
                  type="text"
                  placeholder="WH"
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1 text-center">
                <button
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            </template>

            <!-- Service Type Rows -->
            <template v-else>
            <tr v-for="(service, index) in formData.serviceItems" :key="index">
              <td class="px-2 py-1 text-center text-xs text-gray-900 font-medium">
                {{ index + 1 }}
              </td>
              <td class="px-2 py-1">
                <textarea
                  v-model="service.description"
                  placeholder="Service Description"
                  rows="2"
                  class="w-40 min-w-[180px] text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700 resize-none"
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
                  class="w-20 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateServiceTotal(index); handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="service.totalLC"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-24 text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateServiceTotal(index); handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="service.taxCode"
                  class="w-16 text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="calculateServiceTotal(index); handleServiceItemInput(index)"
                >
                  <option value="EXEMPT">EX</option>
                  <option value="VAT-18">18</option>
                  <option value="VAT-0">0</option>
                </select>
              </td>
              <td class="px-2 py-1 text-right text-xs text-gray-900 font-medium">
                {{ formatCurrency(getServiceTaxAmount(service)) }}
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension1"
                  type="text"
                  placeholder="Dim 1"
                  class="w-20 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension2"
                  type="text"
                  placeholder="Dim 2"
                  class="w-20 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension3"
                  type="text"
                  placeholder="Dim 3"
                  class="w-20 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension4"
                  type="text"
                  placeholder="Dim 4"
                  class="w-20 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.warehouse"
                  type="text"
                  placeholder="WH"
                  class="w-20 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1 text-center">
                <button
                  type="button"
                  @click="removeServiceItem(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Totals Summary -->
    <div v-if="formData.lineItems.length > 0" class="mt-6 border-t pt-4">
      <div class="flex justify-end">
        <div class="w-80 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-900">Total Before Discount:</span>
            <span class="font-medium text-gray-900">{{ formatCurrency(subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-900">Discount:</span>
            <span class="font-medium text-gray-900">{{ formatCurrency(totalDiscount) }}</span>
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
              placeholder="0.00"
              class="w-32 text-sm text-right border-gray-300 rounded-md text-gray-900 placeholder-gray-700 focus:border-gray-400 focus:ring-gray-400"
            />
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-900">Tax:</span>
            <span class="font-medium text-gray-900">{{ formatCurrency(totalTax) }}</span>
          </div>
          <div class="flex justify-between text-base font-bold border-t pt-2">
            <span class="text-gray-900">Total:</span>
            <span class="text-gray-900">{{ formatCurrency(total + (formData.freightAmount || 0)) }}</span>
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
        class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ props.initialData ? 'Update' : 'Create' }} Receipt
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ReceiptType, QualityStatus, Currency } from '../types'
import type { GoodsReceiptFormData, GoodsReceiptLineItem, ServiceItem } from '../types'

// Props
interface Props {
  initialData?: GoodsReceiptFormData
}

const props = withDefaults(defineProps<Props>(), {
  initialData: undefined,
})

// Emits
const emit = defineEmits<{
  submit: [data: GoodsReceiptFormData]
  cancel: []
}>()

// Form Data
const formData = ref<GoodsReceiptFormData>({
  series: 'Local Purchase',
  postingDate: '',
  dueDate: '',
  documentDate: '',
  vendorCode: '',
  vendorName: '',
  contactPerson: '',
  referenceNo: '',
  requestType: 'Item',
  type: 'Item',
  currency: Currency.USD,
  remarks: '',
  receiptNumber: '',
  receiptDate: '',
  purchaseOrderId: '',
  warehouseCode: '',
  department: '',
  costCenter: '',
  projectCode: '',
  notes: '',
  freightType: 'Air Freight',
  freightAmount: 0,
  serviceItems: [
    { description: '', discount: 0, totalLC: 0, taxCode: 'EXEMPT', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '' },
    { description: '', discount: 0, totalLC: 0, taxCode: 'EXEMPT', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '' },
    { description: '', discount: 0, totalLC: 0, taxCode: 'EXEMPT', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '' },
  ],
  lineItems: [
    { itemCode: '', itemName: '', description: '', orderedQuantity: 0, receivedQuantity: 0, quantity: 0, unitPrice: 0, discount: 0, taxCode: 'EXEMPT', taxPercent: 0, accountCode: '', costCenter: '', projectCode: '', warehouseCode: '', warehouse: '', binLocation: '', batchNumber: '', serialNumber: '', qualityStatus: QualityStatus.ACCEPTED, qualityNotes: '', vendorNotes: '', uom: 'pcs', dimension1: '', dimension2: '', dimension3: '', dimension4: '' },
    { itemCode: '', itemName: '', description: '', orderedQuantity: 0, receivedQuantity: 0, quantity: 0, unitPrice: 0, discount: 0, taxCode: 'EXEMPT', taxPercent: 0, accountCode: '', costCenter: '', projectCode: '', warehouseCode: '', warehouse: '', binLocation: '', batchNumber: '', serialNumber: '', qualityStatus: QualityStatus.ACCEPTED, qualityNotes: '', vendorNotes: '', uom: 'pcs', dimension1: '', dimension2: '', dimension3: '', dimension4: '' },
    { itemCode: '', itemName: '', description: '', orderedQuantity: 0, receivedQuantity: 0, quantity: 0, unitPrice: 0, discount: 0, taxCode: 'EXEMPT', taxPercent: 0, accountCode: '', costCenter: '', projectCode: '', warehouseCode: '', warehouse: '', binLocation: '', batchNumber: '', serialNumber: '', qualityStatus: QualityStatus.ACCEPTED, qualityNotes: '', vendorNotes: '', uom: 'pcs', dimension1: '', dimension2: '', dimension3: '', dimension4: '' },
  ],
})

// Supporting Data (removed unused variables)

// Mock tax codes - replace with actual data from store/API
const taxCodes = ref([
  { code: 'VAT', rate: 20 },
  { code: 'GST', rate: 10 },
  { code: 'SALES_TAX', rate: 8.5 },
])

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
          accountCode: item.accountCode || '',
          costCenter: item.costCenter || '',
          projectCode: item.projectCode || '',
          warehouseCode: item.warehouseCode || '',
          binLocation: item.binLocation || '',
          batchNumber: item.batchNumber || '',
          serialNumber: item.serialNumber || '',
          qualityStatus: item.qualityStatus || QualityStatus.ACCEPTED,
          qualityNotes: item.qualityNotes || '',
          vendorNotes: item.vendorNotes || '',
        })),
      }
    }
  },
  { immediate: true },
)

// Set default dates and add initial line item
onMounted(() => {
  if (!props.initialData) {
    const today = new Date()
    formData.value.receiptDate = today.toISOString().split('T')[0]
    formData.value.postingDate = today.toISOString().split('T')[0]
    formData.value.documentDate = today.toISOString().split('T')[0]
    // Add initial empty line item if no data provided
    if (formData.value.lineItems.length === 0) {
      addLineItem()
    }
  }
})

// Service Items Management
const addServiceItem = () => {
  formData.value.serviceItems.push({
    description: '',
    discount: 0,
    totalLC: 0,
    taxCode: 'EXEMPT',
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
    warehouse: '',
  })
}

const removeServiceItem = (index: number) => {
  formData.value.serviceItems.splice(index, 1)
}

const handleServiceItemInput = (index: number) => {
  const service = formData.value.serviceItems[index]
  // Auto-add new line if user is on the last row and has entered any data
  if (hasServiceItemData(service) && index === formData.value.serviceItems.length - 1) {
    addServiceItem()
  }
}

const hasServiceItemData = (service: ServiceItem): boolean => {
  return service.description.trim() !== '' ||
         service.totalLC > 0 ||
         (service.discount && service.discount > 0) ||
         (service.dimension1 && service.dimension1.trim() !== '') ||
         (service.dimension2 && service.dimension2.trim() !== '') ||
         (service.dimension3 && service.dimension3.trim() !== '') ||
         (service.dimension4 && service.dimension4.trim() !== '') ||
         (service.warehouse && service.warehouse.trim() !== '')
}

const calculateServiceTotal = (index: number) => {
  const service = formData.value.serviceItems[index]
  formData.value.serviceItems[index] = { ...service }
}

const getServiceTaxAmount = (service: ServiceItem): number => {
  const totalLC = service.totalLC || 0
  const discount = service.discount || 0
  const discountAmount = totalLC * (discount / 100)
  const taxableAmount = totalLC - discountAmount
  const taxRate = getTaxRate(service.taxCode)
  return taxableAmount * (taxRate / 100)
}

// Line Items Management
const addLineItem = () => {
  formData.value.lineItems.push({
    itemCode: '',
    itemName: '',
    description: '',
    orderedQuantity: 0,
    receivedQuantity: 0,
    quantity: 0,
    unitPrice: 0,
    discount: 0,
    taxCode: 'EXEMPT',
    taxPercent: 0,
    accountCode: '',
    costCenter: '',
    projectCode: '',
    warehouseCode: '',
    warehouse: '',
    binLocation: '',
    batchNumber: '',
    serialNumber: '',
    qualityStatus: QualityStatus.ACCEPTED,
    qualityNotes: '',
    vendorNotes: '',
    uom: 'pcs',
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
  })
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
}

const handleLineItemInput = (index: number) => {
  const item = formData.value.lineItems[index]
  // Auto-add new line if user is on the last row and has entered any data
  if (hasLineItemData(item) && index === formData.value.lineItems.length - 1) {
    addLineItem()
  }
}

const hasLineItemData = (item: Omit<GoodsReceiptLineItem, 'id' | 'lineTotal' | 'taxAmount'>): boolean => {
  return item.itemCode.trim() !== '' ||
         item.description.trim() !== '' ||
         (item.quantity && item.quantity > 0) ||
         item.unitPrice > 0 ||
         (item.discount && item.discount > 0) ||
         (item.dimension1 && item.dimension1.trim() !== '') ||
         (item.dimension2 && item.dimension2.trim() !== '') ||
         (item.dimension3 && item.dimension3.trim() !== '') ||
         (item.dimension4 && item.dimension4.trim() !== '') ||
         (item.warehouse && item.warehouse.trim() !== '')
}

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  const taxCode = taxCodes.value.find((tax) => tax.code === item.taxCode)
  if (taxCode) {
    item.taxPercent = taxCode.rate
  } else {
    item.taxPercent = 0
  }
  calculateLineTotal(index)
}

const calculateLineTotal = (index: number) => {
  // Trigger reactivity by updating the line item
  const item = formData.value.lineItems[index]
  formData.value.lineItems[index] = { ...item }
}

const getLineTotal = (item: Omit<GoodsReceiptLineItem, 'id' | 'lineTotal' | 'taxAmount'>): number => {
  const quantity = item.receivedQuantity || 0
  const price = item.unitPrice || 0
  const discount = item.discount || 0
  const subtotal = quantity * price
  const discountAmount = subtotal * (discount / 100)
  return subtotal - discountAmount
}

const getTaxAmount = (item: Omit<GoodsReceiptLineItem, 'id' | 'lineTotal' | 'taxAmount'>): number => {
  const lineTotal = getLineTotal(item)
  const taxRate = getTaxRate(item.taxCode)
  return lineTotal * (taxRate / 100)
}

const getInclusiveTotal = (item: Omit<GoodsReceiptLineItem, 'id' | 'lineTotal' | 'taxAmount'>): number => {
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
  const itemTotal = formData.value.lineItems.reduce((sum, item) => {
    return sum + getLineTotal(item)
  }, 0)

  const serviceTotal = formData.value.serviceItems.reduce((sum: number, service: ServiceItem) => {
    const discount = service.discount || 0
    const totalLC = service.totalLC || 0
    const discountAmount = totalLC * (discount / 100)
    return sum + totalLC - discountAmount
  }, 0)

  return itemTotal + serviceTotal
})

const totalDiscount = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const quantity = item.quantity || item.receivedQuantity || 0
    const discount = item.discount || 0
    const lineSubtotal = quantity * item.unitPrice
    return sum + lineSubtotal * (discount / 100)
  }, 0)
})

const totalTax = computed(() => {
  const itemTax = formData.value.lineItems.reduce((sum, item) => {
    return sum + getTaxAmount(item)
  }, 0)

  const serviceTax = formData.value.serviceItems.reduce((sum: number, service: ServiceItem) => {
    return sum + getServiceTaxAmount(service)
  }, 0)

  return itemTax + serviceTax
})

const total = computed(() => {
  return subtotal.value + totalTax.value
})

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.vendorCode &&
    formData.value.purchaseOrderId &&
    formData.value.warehouseCode &&
    formData.value.department &&
    formData.value.costCenter &&
    formData.value.receiptDate &&
    formData.value.postingDate &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every(
      (item) =>
        item.itemCode && item.description && item.receivedQuantity > 0 && item.unitPrice >= 0,
    )
  )
})

// Form Submission
const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', formData.value)
  }
}

// Button Handlers
const handleImportExcel = () => {
  // Import Excel functionality
  console.log('Import Excel clicked')
}

const handleSampleExcel = () => {
  // Sample Excel functionality
  console.log('Sample Excel clicked')
}

const handleCopyFrom = () => {
  // Copy From functionality
  console.log('Copy From clicked')
}

// Utility Functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

</script>
