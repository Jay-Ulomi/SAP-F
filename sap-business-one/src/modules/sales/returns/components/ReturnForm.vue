<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Return</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <label for="returnDate" class="block text-sm font-medium text-gray-700 mb-1">
            Document Date *
          </label>
          <input
            id="returnDate"
            v-model="formData.returnDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            id="dueDate"
            v-model="formData.dueDate"
            type="date"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="customerCode" class="block text-sm font-medium text-gray-700 mb-1">
            Customer Code *
          </label>
          <input
            id="customerCode"
            v-model="formData.customerCode"
            type="text"
            required
            placeholder="Enter customer code"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="customerName" class="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <input
            id="customerName"
            v-model="formData.customerName"
            type="text"
            placeholder="Enter customer name"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="contactPerson" class="block text-sm font-medium text-gray-700 mb-1">
            Contact Person
          </label>
          <input
            id="contactPerson"
            v-model="formData.contactPerson"
            type="text"
            placeholder="Enter contact person"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="referenceNo" class="block text-sm font-medium text-gray-700 mb-1">
            Reference No.
          </label>
          <input
            id="referenceNo"
            v-model="formData.reference"
            type="text"
            placeholder="Enter reference number"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="salesEmployee" class="block text-sm font-medium text-gray-700 mb-1">
            Sales Employee
          </label>
          <input
            id="salesEmployee"
            v-model="formData.salesPerson"
            type="text"
            placeholder="Enter sales employee"
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
            placeholder="Enter remarks (max 254 characters)"
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
            <label for="returnType" class="text-sm font-medium text-gray-700">
              Type:
            </label>
            <select
              id="returnType"
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
        No line items added yet. Click "Add Line" to add items to this return.
      </div>

      <div v-else class="w-full overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <!-- Item Type Headers -->
          <thead v-if="formData.type === 'Item'" class="bg-gray-50">
            <tr>
              <th class="min-w-[100px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50">
                Item No.
              </th>
              <th class="min-w-[150px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Qty
              </th>
              <th class="min-w-[100px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Disc%
              </th>
              <th class="min-w-[100px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Tax
              </th>
              <th class="min-w-[120px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                Return Reason
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Dim1
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Dim2
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">
                Dim3
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">
                Dim4
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                WH
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Project
              </th>
              <th class="min-w-[60px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase sticky right-0 bg-gray-50">
              </th>
            </tr>
          </thead>

          <!-- Service Type Headers -->
          <thead v-else class="bg-gray-50">
            <tr>
              <th class="min-w-[60px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50">
                Sno.
              </th>
              <th class="min-w-[200px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Discount
              </th>
              <th class="min-w-[120px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Total (LC)
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Tax Code
              </th>
              <th class="min-w-[120px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Tax Amount
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Dim1
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Dim2
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">
                Dim3
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">
                Dim4
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                Warehouse
              </th>
              <th class="min-w-[120px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Project
              </th>
              <th class="min-w-[120px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                Return Reason
              </th>
              <th class="min-w-[60px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase sticky right-0 bg-gray-50">
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Item Type Rows -->
            <template v-if="formData.type === 'Item'">
            <tr v-for="(item, index) in formData.lineItems" :key="`item-${index}`">
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
                  step="0.01"
                  min="0"
                  placeholder="0"
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="item.unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-20 text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="item.discount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0"
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <span class="text-xs text-gray-900">{{ formatCurrency((item.quantity || 0) * (item.unitPrice || 0) - (item.discount || 0)) }}</span>
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="item.taxCode"
                  class="w-12 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                >
                  <option value="">-</option>
                  <option v-for="tax in taxCodes" :key="tax.code" :value="tax.code">{{ tax.code }}</option>
                </select>
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="item.returnReason"
                  class="w-20 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                >
                  <option value="">-</option>
                  <option v-for="reason in returnReasons" :key="reason" :value="reason">{{ reason }}</option>
                </select>
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
                  v-model="item.warehouseCode"
                  type="text"
                  placeholder="WH"
                  class="w-16 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.project"
                  type="text"
                  placeholder="Project"
                  class="w-20 text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <button
                  v-if="formData.lineItems.length > 5"
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-600 hover:text-red-800 text-xs"
                >
                  ×
                </button>
              </td>
            </tr>
            </template>

            <!-- Service Type Rows -->
            <template v-else>
            <tr v-for="(service, index) in formData.serviceItems" :key="`service-${index}`">
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
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="service.total"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="service.taxCode"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="handleServiceItemInput(index)"
                >
                  <option value="OEXEMPT">OEXEMPT</option>
                  <option value="OVAT-18">OVAT-18</option>
                  <option value="OVAT-0">OVAT-0</option>
                </select>
              </td>
              <td class="px-2 py-1 text-right text-xs text-gray-900">
                {{ formatCurrency(service.taxAmount || 0) }}
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension1"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension2"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension3"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="service.dimension4"
                  type="text"
                  placeholder="Dim"
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
                <input
                  v-model="service.project"
                  type="text"
                  placeholder="Project"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="service.returnReason"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="handleServiceItemInput(index)"
                >
                  <option value="">-</option>
                  <option v-for="reason in returnReasons" :key="reason" :value="reason">{{ reason }}</option>
                </select>
              </td>
              <td class="px-2 py-1 text-center">
                <button
                  v-if="formData.serviceItems.length > 5"
                  type="button"
                  @click="removeServiceItem(index)"
                  class="text-red-600 hover:text-red-800 text-xs w-6 h-6 rounded flex items-center justify-center"
                >
                  ×
                </button>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Totals Summary -->
      <div v-if="(formData.type === 'Item' && formData.lineItems.length > 0) || (formData.type === 'Service' && formData.serviceItems.length > 0)" class="mt-6 border-t pt-4">
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
                <option value="Land Freight">Land Freight</option>
              </select>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Freight:</span>
              <input
                v-model.number="formData.freightAmount"
                type="number"
                step="0.01"
                min="0"
                class="w-32 text-sm border-gray-300 rounded-md text-gray-900 focus:border-gray-400 focus:ring-gray-400"
                placeholder="0.00"
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
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useReturnsStore } from '../stores/returnsStore'
import type { ReturnFormData, Return, Customer } from '../types'
import { ReturnStatus, ReturnType, ReturnReason, Currency } from '../types'

interface Props {
  initialData?: Return
  isEditing?: boolean
}

interface Emits {
  (e: 'saved', data: Return): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
})

const emit = defineEmits<Emits>()

const store = useReturnsStore()

// Supporting Data
const customers = computed(() => store.customers)

// Form data
const formData = ref<ReturnFormData>({
  customerCode: '',
  customerName: '',
  contactPerson: '',
  returnDate: '',
  postingDate: '',
  dueDate: '',
  currency: 'USD',
  exchangeRate: 1,
  salesPerson: '',
  reference: '',
  remarks: '',
  project: '',
  freightType: 'Air Freight',
  freightAmount: 0,
  trackingNumber: '',
  carrier: '',
  estimatedReturnDate: '',
  type: 'Item', // Line item type
  lineItems: [],
  serviceItems: [],
})

// UI state
const loading = ref(false)
const showCustomerDropdown = ref(false)
const showInvoiceDropdown = ref(false)
const showOrderDropdown = ref(false)
const showItemDropdowns = ref<boolean[]>([])
const filteredCustomers = ref<Customer[]>([])
const filteredInvoices = ref<Array<{ id: string; docNum: string; customerName: string }>>([])
const filteredOrders = ref<Array<{ id: string; docNum: string; customerName: string }>>([])
const filteredItems = ref<Array<Array<{ code: string; name: string; price: number }>>>([])

// Get tax codes from store
const taxCodes = computed(() => store.taxCodes)

// Button handlers
const handleImportExcel = () => {
  console.log('Import Excel clicked')
}

const handleSampleExcel = () => {
  console.log('Sample Excel clicked')
}

const handleCopyFrom = () => {
  console.log('Copy From clicked')
}

// Line item handling functions
const hasLineItemData = (item: any): boolean => {
  return item.itemCode?.trim() !== '' ||
         item.description?.trim() !== '' ||
         (item.quantity && item.quantity > 0) ||
         (item.unitPrice && item.unitPrice > 0) ||
         (item.discount && item.discount > 0) ||
         item.dimension1?.trim() !== '' ||
         item.dimension2?.trim() !== '' ||
         item.dimension3?.trim() !== '' ||
         item.dimension4?.trim() !== '' ||
         item.warehouseCode?.trim() !== '' ||
         item.project?.trim() !== ''
}

const hasServiceItemData = (service: any): boolean => {
  return service.description?.trim() !== '' ||
         (service.discount && service.discount > 0) ||
         (service.total && service.total > 0) ||
         service.taxCode?.trim() !== '' ||
         service.dimension1?.trim() !== '' ||
         service.dimension2?.trim() !== '' ||
         service.dimension3?.trim() !== '' ||
         service.dimension4?.trim() !== '' ||
         service.warehouse?.trim() !== '' ||
         service.project?.trim() !== '' ||
         service.returnReason?.trim() !== ''
}

const handleLineItemInput = (index: number) => {
  const item = formData.value.lineItems[index]

  // If this is the last row and it has data, add a new empty row
  if (index === formData.value.lineItems.length - 1 && hasLineItemData(item)) {
    addLineItem()
  }

  // Ensure we always have at least 5 rows
  while (formData.value.lineItems.length < 5) {
    addLineItem()
  }
}

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.customerCode &&
    formData.value.returnDate &&
    formData.value.postingDate &&
    formData.value.type &&
    formData.value.currency &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every((item) => item.itemCode && item.description && item.quantity > 0)
  )
})

const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => sum + getLineTotal(item), 0)
})

const totalDiscount = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    if (item.discountType === 'PERCENTAGE') {
      return sum + (item.quantity * item.unitPrice * item.discount) / 100
    }
    return sum + item.discount
  }, 0)
})

const totalTax = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const lineTotal = getLineTotal(item)
    return sum + (lineTotal * item.taxRate) / 100
  }, 0)
})

const total = computed(() => subtotal.value - totalDiscount.value + totalTax.value)

const showReturnAddress = computed(() => {
  const address = formData.value.returnAddress
  if (!address) return false
  return address.street || address.city || address.state || address.postalCode || address.country
})

// Constants
const returnTypes = Object.values(ReturnType)
const returnReasons = Object.values(ReturnReason)
const currencies = Object.values(Currency)

// Methods
const initializeForm = () => {
  if (props.initialData) {
    formData.value = {
      customerCode: props.initialData.customerCode,
      returnDate: props.initialData.returnDate,
      postingDate: props.initialData.postingDate,
      type: props.initialData.type,
      currency: props.initialData.currency,
      exchangeRate: props.initialData.exchangeRate,
      salesPerson: props.initialData.salesPerson || '',
      reference: props.initialData.reference || '',
      remarks: props.initialData.remarks || '',
      project: props.initialData.project || '',
      relatedInvoiceId: props.initialData.relatedInvoiceId || '',
      relatedOrderId: props.initialData.relatedOrderId || '',
      returnMethod: props.initialData.returnMethod || '',
      returnAddress: props.initialData.returnAddress || {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      },
      trackingNumber: props.initialData.trackingNumber || '',
      carrier: props.initialData.carrier || '',
      estimatedReturnDate: props.initialData.estimatedReturnDate || '',
      lineItems: props.initialData.lineItems.map((item) => ({
        itemCode: item.itemCode,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        discountType: item.discountType,
        taxCode: item.taxCode,
        taxRate: item.taxRate,
        returnReason: item.returnReason,
        returnNotes: item.returnNotes || '',
        originalInvoiceId: item.originalInvoiceId || '',
        originalLineItemId: item.originalLineItemId || '',
        warehouseCode: item.warehouseCode || '',
        batchNumber: item.batchNumber || '',
        serialNumber: item.serialNumber || '',
        remarks: item.remarks || '',
      })),
    }
  } else {
    // Set default dates
    const today = new Date().toISOString().split('T')[0]
    formData.value.returnDate = today
    formData.value.postingDate = today
  }
}

const addLineItem = () => {
  formData.value.lineItems.push({
    itemCode: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    discountType: 'PERCENTAGE',
    taxCode: '',
    taxRate: 0,
    returnReason: ReturnReason.DEFECTIVE_PRODUCT,
    returnNotes: '',
    originalInvoiceId: '',
    originalLineItemId: '',
    warehouseCode: '',
    batchNumber: '',
    serialNumber: '',
    remarks: '',
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
    project: '',
    sno: (formData.value.lineItems.length + 1).toString(),
  })
  showItemDropdowns.value.push(false)
  filteredItems.value.push([])
}

const removeLineItem = (index: number) => {
  // Only allow removal if we have more than 5 rows
  if (formData.value.lineItems.length > 5) {
    formData.value.lineItems.splice(index, 1)
    showItemDropdowns.value.splice(index, 1)
    filteredItems.value.splice(index, 1)
  }
}

const handleServiceItemInput = (index: number) => {
  const service = formData.value.serviceItems[index]
  // If this is the last row and it has data, add a new empty row
  if (index === formData.value.serviceItems.length - 1 && hasServiceItemData(service)) {
    addServiceItem()
  }
  // Ensure we always have at least 5 rows
  while (formData.value.serviceItems.length < 5) {
    addServiceItem()
  }
}

const addServiceItem = () => {
  const nextSno = formData.value.serviceItems.length + 1
  formData.value.serviceItems.push({
    sno: nextSno,
    description: '',
    discount: 0,
    total: 0,
    taxCode: 'OEXEMPT',
    taxAmount: 0,
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
    warehouse: '',
    project: '',
    returnReason: ''
  })
}

const removeServiceItem = (index: number) => {
  // Only allow removal if we have more than 5 rows
  if (formData.value.serviceItems.length > 5) {
    formData.value.serviceItems.splice(index, 1)
    // Recalculate serial numbers
    formData.value.serviceItems.forEach((item, idx) => {
      item.sno = idx + 1
    })
  }
}

const calculateLineTotal = (index: number) => {
  const item = formData.value.lineItems[index]
  if (item.quantity && item.unitPrice) {
    let lineTotal = item.quantity * item.unitPrice

    // Apply discount
    if (item.discount > 0) {
      if (item.discountType === 'PERCENTAGE') {
        lineTotal -= (lineTotal * item.discount) / 100
      } else {
        lineTotal -= item.discount
      }
    }

    // Apply tax
    if (item.taxRate > 0) {
      lineTotal += (lineTotal * item.taxRate) / 100
    }

    // Update the item (this will trigger reactivity)
    formData.value.lineItems[index] = { ...item }
  }
}

const getLineTotal = (item: any) => {
  let lineTotal = item.quantity * item.unitPrice

  // Apply discount
  if (item.discount > 0) {
    if (item.discountType === 'PERCENTAGE') {
      lineTotal -= (lineTotal * item.discount) / 100
    } else {
      lineTotal -= item.discount
    }
  }

  // Apply tax
  if (item.taxRate > 0) {
    lineTotal += (lineTotal * item.taxRate) / 100
  }

  return lineTotal
}

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  if (item.taxCode) {
    const taxCode = store.taxCodes.find((t) => t.code === item.taxCode)
    if (taxCode) {
      item.taxRate = taxCode.rate
      calculateLineTotal(index)
    }
  } else {
    item.taxRate = 0
    calculateLineTotal(index)
  }
}

const handleCustomerSearch = async () => {
  if (formData.value.customerCode.length >= 2) {
    await store.fetchCustomers(formData.value.customerCode)
    filteredCustomers.value = store.customers
  } else {
    filteredCustomers.value = []
  }
}

const selectCustomer = (customer: Customer) => {
  formData.value.customerCode = customer.code
  filteredCustomers.value = []
}

const handleInvoiceSearch = async () => {
  if (formData.value.relatedInvoiceId.length >= 2) {
    const invoices = await store.fetchInvoices(formData.value.relatedInvoiceId)
    filteredInvoices.value = invoices
  } else {
    filteredInvoices.value = []
  }
}

const selectInvoice = (invoice: { id: string; docNum: string; customerName: string }) => {
  formData.value.relatedInvoiceId = invoice.id
  filteredInvoices.value = []
}

const handleOrderSearch = async () => {
  if (formData.value.relatedOrderId.length >= 2) {
    const orders = await store.fetchSalesOrders(formData.value.relatedOrderId)
    filteredOrders.value = orders
  } else {
    filteredOrders.value = []
  }
}

const selectOrder = (order: { id: string; docNum: string; customerName: string }) => {
  formData.value.relatedOrderId = order.id
  filteredOrders.value = []
}

const handleItemSearch = async (index: number) => {
  const item = formData.value.lineItems[index]
  if (item.itemCode.length >= 2) {
    const items = await store.fetchItems(item.itemCode)
    filteredItems.value[index] = items
  } else {
    filteredItems.value[index] = []
  }
}

const selectItem = (index: number, item: { code: string; name: string; price: number }) => {
  formData.value.lineItems[index].itemCode = item.code
  formData.value.lineItems[index].description = item.name
  formData.value.lineItems[index].unitPrice = item.price
  filteredItems.value[index] = []
  calculateLineTotal(index)
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  loading.value = true

  try {
    let result
    if (props.isEditing && props.initialData) {
      result = await store.updateReturn(props.initialData.id, formData.value)
    } else {
      result = await store.createReturn(formData.value)
    }

    if (result.success) {
      emit('saved', result.data)
    }
  } catch (error) {
    console.error('Error saving return:', error)
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount)
}

const formatReturnType = (type: ReturnType) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReturnReason = (reason: ReturnReason) => {
  return reason.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

// Lifecycle
onMounted(async () => {
  await store.fetchTaxCodes()
  await store.fetchCustomers()
  initializeForm()

  // Add 5 default line items if not editing
  if (!props.initialData) {
    for (let i = 0; i < 5; i++) {
      addLineItem()
    }
    // Add 5 default service items
    for (let i = 0; i < 5; i++) {
      addServiceItem()
    }
  }
})

// Watch for changes
watch(
  () => formData.value.lineItems.length,
  (newLength) => {
    // Ensure showItemDropdowns and filteredItems arrays match lineItems length
    while (showItemDropdowns.value.length < newLength) {
      showItemDropdowns.value.push(false)
    }
    while (filteredItems.value.length < newLength) {
      filteredItems.value.push([])
    }
  },
)
</script>
