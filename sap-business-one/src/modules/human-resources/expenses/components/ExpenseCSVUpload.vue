<template>
  <div class="space-y-6">
    <!-- Step 1: Instructions and File Upload -->
    <div v-if="step === 1" class="space-y-6">
      <!-- Instructions -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 class="text-lg font-medium text-blue-900 mb-4">Step 1: Upload File</h4>
        <p class="text-blue-800 mb-4">If you have expense data in an Excel or CSV file, you can import the data using this page.</p>
        
        <div class="space-y-4">
          <div>
            <h5 class="font-medium text-blue-900 mb-2">How to convert Excel file to CSV</h5>
            <ol class="list-decimal list-inside text-sm text-blue-800 space-y-1">
              <li>Open your excel file.</li>
              <li>Click on File and Save as.</li>
              <li>Select where you would like to save the file (like your desktop or a drive).</li>
              <li>In the File Name area, name your document.</li>
              <li>In the Save as Type area, select <strong>CSV(Comma Delimited)</strong> from the pull down menu.</li>
              <li>Click Save.</li>
              <li>You may receive one or two warnings about the formatting of .csv, click yes.</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- File Requirements -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h4 class="text-lg font-medium text-gray-900 mb-4">Prepare your expenses file:</h4>
        
        <div class="space-y-6">
          <!-- Required Columns -->
          <div>
            <h5 class="font-medium text-gray-900 mb-3">Required Columns</h5>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 border border-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Allowed Values</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">Expense Type</td>
                    <td class="px-4 py-2 text-sm text-gray-700">
                      <div class="flex flex-wrap gap-1">
                        <span v-for="type in expenseTypes" :key="type" class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {{ type }}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">Expense Amount</td>
                    <td class="px-4 py-2 text-sm text-gray-700">Numbers or Decimals only</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">Expense Date</td>
                    <td class="px-4 py-2 text-sm text-gray-700">dd/mm/yyyy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Optional Columns -->
          <div>
            <h5 class="font-medium text-gray-900 mb-3">Optional Columns</h5>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 border border-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Allowed Values</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">Description</td>
                    <td class="px-4 py-2 text-sm text-gray-700">Any text</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">Is Expense Recurring?</td>
                    <td class="px-4 py-2 text-sm text-gray-700">Yes or No</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">Recurring Period</td>
                    <td class="px-4 py-2 text-sm text-gray-700">
                      Weekly, Monthly, Custom (see details below)
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">Source of Funds</td>
                    <td class="px-4 py-2 text-sm text-gray-700">Cash, Bank Account Name</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Recurring Options Details -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 class="font-medium text-yellow-900 mb-2">Recurring Expense Options</h5>
            <div class="text-sm text-yellow-800 space-y-2">
              <div>
                <strong>Weekly:</strong> Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday of every week
              </div>
              <div>
                <strong>Monthly:</strong> 1st through 31st of every month, or "End of every month"
              </div>
              <div>
                <strong>Custom:</strong> "15th and 30th of every month"
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upload Section -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h4 class="text-lg font-medium text-gray-900 mb-4">Upload your file:</h4>
        
        <div class="space-y-4">
          <!-- Separator Option -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Columns Separated By (optional)
            </label>
            <select 
              v-model="separator" 
              class="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Auto Detect</option>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
            </select>
            <p class="text-xs text-gray-500 mt-1">
              Leave this empty so the system can auto detect. Only select this if after uploading, you are seeing all the data in 1 column on Step 2.
            </p>
          </div>

          <!-- File Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Upload CSV File (.csv)
            </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label class="relative cursor-pointer bg-white rounded-md font-medium text-sap-blue hover:text-sap-blue-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sap-blue">
                    <span>Upload a file</span>
                    <input 
                      type="file" 
                      class="sr-only" 
                      accept=".csv,.txt"
                      @change="handleFileSelect"
                      ref="fileInput"
                    >
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">CSV files up to 10MB</p>
              </div>
            </div>
            <div v-if="selectedFile" class="mt-2 text-sm text-gray-600">
              Selected: <span class="font-medium">{{ selectedFile.name }}</span> ({{ formatFileSize(selectedFile.size) }})
            </div>
          </div>
        </div>

        <!-- Tips -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <h5 class="font-medium text-green-900 mb-2">Tips:</h5>
          <ul class="text-sm text-green-800 space-y-1">
            <li>• <button @click="downloadSample" class="text-sap-blue hover:text-sap-blue-dark underline">Click here to download a sample file.</button></li>
            <li>• Expenses will be uploaded to the current branch.</li>
            <li>• You can upload a maximum of 4500 entries in 1 file. If you have more entries, please split them into multiple files.</li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 pt-6">
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="processFile"
            :disabled="!selectedFile || uploading"
            class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ uploading ? 'Processing...' : 'Process File' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Step 2: Preview and Validation -->
    <div v-if="step === 2" class="space-y-6">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 class="text-lg font-medium text-blue-900 mb-2">Step 2: Review Data</h4>
        <p class="text-blue-800">Review the parsed data below and make any necessary corrections before importing.</p>
      </div>

      <!-- Data Preview -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-lg font-medium text-gray-900">
            Data Preview ({{ parsedData.length }} records found)
          </h4>
          <div class="flex space-x-2">
            <button
              @click="step = 1"
              class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Upload
            </button>
          </div>
        </div>

        <!-- Validation Errors -->
        <div v-if="validationErrors.length > 0" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <h5 class="font-medium text-red-900 mb-2">Validation Errors ({{ validationErrors.length }})</h5>
          <div class="max-h-32 overflow-y-auto">
            <ul class="text-sm text-red-800 space-y-1">
              <li v-for="(error, index) in validationErrors" :key="index">
                Row {{ error.row }}: {{ error.message }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Data Table -->
        <div class="overflow-x-auto max-h-96 border border-gray-300 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 sticky top-0">
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Row</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Recurring</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(row, index) in parsedData" :key="index" 
                  :class="row.hasErrors ? 'bg-red-50' : 'hover:bg-gray-50'">
                <td class="px-3 py-2 text-xs text-gray-600">{{ index + 1 }}</td>
                <td class="px-3 py-2 text-xs" :class="row.errors?.expenseType ? 'text-red-600' : 'text-gray-900'">
                  {{ row.expenseType || '-' }}
                </td>
                <td class="px-3 py-2 text-xs" :class="row.errors?.expenseAmount ? 'text-red-600' : 'text-gray-900'">
                  {{ row.expenseAmount ? formatCurrency(row.expenseAmount) : '-' }}
                </td>
                <td class="px-3 py-2 text-xs" :class="row.errors?.expenseDate ? 'text-red-600' : 'text-gray-900'">
                  {{ row.expenseDate || '-' }}
                </td>
                <td class="px-3 py-2 text-xs text-gray-900 max-w-xs truncate">
                  {{ row.description || '-' }}
                </td>
                <td class="px-3 py-2 text-xs text-gray-900">
                  {{ row.isRecurring ? 'Yes' : 'No' }}
                </td>
                <td class="px-3 py-2 text-xs text-gray-900">
                  {{ row.sourceOfFunds || 'Cash' }}
                </td>
                <td class="px-3 py-2 text-xs">
                  <span v-if="row.hasErrors" class="text-red-600 font-medium">Error</span>
                  <span v-else class="text-green-600 font-medium">Valid</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary -->
        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-sm text-gray-600">Total Records</div>
            <div class="text-xl font-bold text-gray-900">{{ parsedData.length }}</div>
          </div>
          <div class="bg-green-50 p-3 rounded-lg">
            <div class="text-sm text-green-600">Valid Records</div>
            <div class="text-xl font-bold text-green-900">{{ validRecords.length }}</div>
          </div>
          <div class="bg-red-50 p-3 rounded-lg">
            <div class="text-sm text-red-600">Invalid Records</div>
            <div class="text-xl font-bold text-red-900">{{ invalidRecords.length }}</div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 pt-6">
          <button
            @click="step = 1"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back
          </button>
          <button
            @click="importData"
            :disabled="validRecords.length === 0 || importing"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ importing ? 'Importing...' : `Import ${validRecords.length} Records` }}
          </button>
        </div>
      </div>
    </div>

    <!-- Step 3: Success -->
    <div v-if="step === 3" class="space-y-6">
      <div class="text-center py-12">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Import Successful!</h3>
        <p class="text-gray-600 mb-6">
          Successfully imported {{ importResults.successful }} expense records.
          <span v-if="importResults.failed > 0">{{ importResults.failed }} records failed to import.</span>
        </p>
        <div class="space-x-3">
          <button
            @click="$emit('upload-complete', importResults)"
            class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-blue-dark"
          >
            Done
          </button>
          <button
            @click="resetUpload"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Upload Another File
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Emits
const emit = defineEmits<{
  'upload-complete': [result: any]
  'cancel': []
}>()

// State
const step = ref(1)
const selectedFile = ref<File | null>(null)
const separator = ref('')
const uploading = ref(false)
const importing = ref(false)
const parsedData = ref<any[]>([])
const validationErrors = ref<any[]>([])
const importResults = ref({ successful: 0, failed: 0 })

// File input ref
const fileInput = ref<HTMLInputElement>()

// Expense types (as per requirements)
const expenseTypes = [
  'Accommodation', 'Advertising and Promotion', 'Auto Expenses', 'Bank/Finance Charges',
  'Cell Phone', 'Computer Hardware', 'Computer Software', 'Insurance',
  'Leasing Payments', 'Legal and Professional Fees', 'Miscellaneous', 'Office Equipment',
  'Office Rent', 'Postage', 'Printing', 'Stationery', 'Subscriptions', 'Travel'
]

// Computed
const validRecords = computed(() => parsedData.value.filter(row => !row.hasErrors))
const invalidRecords = computed(() => parsedData.value.filter(row => row.hasErrors))

// Methods
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const downloadSample = () => {
  const csvContent = [
    'Expense Type,Expense Amount,Expense Date,Description,Is Expense Recurring?,Source of Funds',
    'Travel,125.50,15/01/2024,Business trip to client office,No,Cash',
    'Accommodation,89.99,16/01/2024,Hotel stay for conference,No,Bank Account',
    'Office Equipment,299.00,18/01/2024,Wireless mouse and keyboard,No,Cash',
    'Auto Expenses,45.00,20/01/2024,Fuel for company car,Yes,Bank Account'
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', 'sample_expenses.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const processFile = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  try {
    const text = await selectedFile.value.text()
    const rows = parseCSV(text, separator.value || ',')
    
    if (rows.length === 0) {
      alert('No data found in the file')
      return
    }

    // Process and validate data
    const processedData = rows.slice(1).map((row, index) => {
      const rowData = processRow(row, rows[0], index + 2)
      return rowData
    })

    parsedData.value = processedData
    collectValidationErrors()
    step.value = 2
  } catch (error) {
    console.error('Error processing file:', error)
    alert('Error processing file. Please check the file format.')
  } finally {
    uploading.value = false
  }
}

const parseCSV = (text: string, delimiter: string) => {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentCell = ''
  let inQuotes = false
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const nextChar = text[i + 1]
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"'
        i++ // Skip next quote
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === delimiter && !inQuotes) {
      currentRow.push(currentCell.trim())
      currentCell = ''
    } else if (char === '\n' && !inQuotes) {
      currentRow.push(currentCell.trim())
      if (currentRow.some(cell => cell.length > 0)) {
        rows.push(currentRow)
      }
      currentRow = []
      currentCell = ''
    } else if (char !== '\r') {
      currentCell += char
    }
  }
  
  // Add last row if exists
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim())
    rows.push(currentRow)
  }
  
  return rows
}

const processRow = (row: string[], headers: string[], rowNumber: number) => {
  const data: any = { hasErrors: false, errors: {} }
  
  // Map data based on headers (case insensitive)
  headers.forEach((header, index) => {
    const normalizedHeader = header.toLowerCase().replace(/\s+/g, '')
    const value = row[index]?.trim() || ''
    
    if (normalizedHeader.includes('expensetype') || normalizedHeader.includes('type')) {
      data.expenseType = value
    } else if (normalizedHeader.includes('expenseamount') || normalizedHeader.includes('amount')) {
      data.expenseAmount = parseFloat(value) || 0
    } else if (normalizedHeader.includes('expensedate') || normalizedHeader.includes('date')) {
      data.expenseDate = value
    } else if (normalizedHeader.includes('description')) {
      data.description = value
    } else if (normalizedHeader.includes('recurring')) {
      data.isRecurring = value.toLowerCase() === 'yes'
    } else if (normalizedHeader.includes('source') || normalizedHeader.includes('funds')) {
      data.sourceOfFunds = value || 'Cash'
    }
  })
  
  // Validation
  if (!data.expenseType || !expenseTypes.includes(data.expenseType)) {
    data.hasErrors = true
    data.errors.expenseType = 'Invalid or missing expense type'
  }
  
  if (!data.expenseAmount || data.expenseAmount <= 0) {
    data.hasErrors = true
    data.errors.expenseAmount = 'Invalid or missing amount'
  }
  
  if (!data.expenseDate || !isValidDate(data.expenseDate)) {
    data.hasErrors = true
    data.errors.expenseDate = 'Invalid or missing date (use dd/mm/yyyy format)'
  }
  
  data.rowNumber = rowNumber
  return data
}

const isValidDate = (dateString: string) => {
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
  if (!regex.test(dateString)) return false
  
  const [day, month, year] = dateString.split('/').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

const collectValidationErrors = () => {
  validationErrors.value = []
  parsedData.value.forEach(row => {
    if (row.hasErrors) {
      Object.keys(row.errors).forEach(field => {
        validationErrors.value.push({
          row: row.rowNumber,
          field,
          message: row.errors[field]
        })
      })
    }
  })
}

const importData = async () => {
  if (validRecords.value.length === 0) return

  importing.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock import results
    importResults.value = {
      successful: validRecords.value.length,
      failed: invalidRecords.value.length
    }
    
    step.value = 3
  } catch (error) {
    console.error('Error importing data:', error)
    alert('Error importing data. Please try again.')
  } finally {
    importing.value = false
  }
}

const resetUpload = () => {
  step.value = 1
  selectedFile.value = null
  separator.value = ''
  parsedData.value = []
  validationErrors.value = []
  importResults.value = { successful: 0, failed: 0 }
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>