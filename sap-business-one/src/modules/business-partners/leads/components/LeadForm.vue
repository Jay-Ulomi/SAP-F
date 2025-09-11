<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Tabs -->
    <div class="bg-white rounded-lg shadow">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            type="button"
            class="py-2 px-1 border-b-2 font-medium text-sm"
            :class="
              activeTab === tab.id
                ? 'border-sap-blue text-sap-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            "
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Basic Information Tab -->
      <div v-if="activeTab === 'basic'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Basic Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lead Code *</label>
            <input
              v-model="formData.leadCode"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="LEAD-001"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input
              v-model="formData.companyName"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Company Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lead Name *</label>
            <input
              v-model="formData.leadName"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Contact Person Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lead Status *</label>
            <select
              v-model="formData.status"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Status</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="PROPOSAL_SENT">Proposal Sent</option>
              <option value="NEGOTIATION">Negotiation</option>
              <option value="WON">Won</option>
              <option value="LOST">Lost</option>
              <option value="DISQUALIFIED">Disqualified</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lead Source *</label>
            <select
              v-model="formData.source"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Source</option>
              <option value="WEBSITE">Website</option>
              <option value="REFERRAL">Referral</option>
              <option value="TRADE_SHOW">Trade Show</option>
              <option value="SOCIAL_MEDIA">Social Media</option>
              <option value="EMAIL_CAMPAIGN">Email Campaign</option>
              <option value="COLD_CALL">Cold Call</option>
              <option value="PARTNER">Partner</option>
              <option value="ADVERTISING">Advertising</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
            <select
              v-model="formData.priority"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lead Type *</label>
            <select
              v-model="formData.type"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Type</option>
              <option value="PROSPECT">Prospect</option>
              <option value="POTENTIAL_CUSTOMER">Potential Customer</option>
              <option value="EXISTING_CUSTOMER">Existing Customer</option>
              <option value="PARTNER">Partner</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              v-model="formData.industry"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Technology, Manufacturing"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              v-model="formData.website"
              type="url"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              v-model="formData.phone"
              type="tel"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="+1-555-123-4567"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fax</label>
            <input
              v-model="formData.fax"
              type="tel"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="+1-555-123-4568"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Additional notes about the lead"
          ></textarea>
        </div>
      </div>

      <!-- Contact Information Tab -->
      <div v-if="activeTab === 'contact'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Contact Information</h3>

        <!-- Primary Contact -->
        <div class="rounded-lg p-4 mb-6">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Primary Contact</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                v-model="primaryContact.firstName"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="John"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                v-model="primaryContact.lastName"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Doe"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                v-model="primaryContact.position"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Manager"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                v-model="primaryContact.email"
                type="email"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                v-model="primaryContact.phone"
                type="tel"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="+1-555-123-4567"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <input
                v-model="primaryContact.mobile"
                type="tel"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="+1-555-987-6543"
              />
            </div>
          </div>

          <div class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              v-model="primaryContact.notes"
              rows="2"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Additional notes about this contact"
            ></textarea>
          </div>
        </div>

        <!-- Additional Contacts -->
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-sm font-medium text-gray-900">Additional Contacts</h4>
          <button
            type="button"
            @click="addContact"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add Contact
          </button>
        </div>

        <div v-if="formData.contacts.length === 0" class="text-center py-8 text-gray-500">
          No additional contacts added yet. Click "Add Contact" to add more contacts.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(contact, index) in formData.contacts"
            :key="index"
            class="rounded-lg p-4 border border-gray-200"
          >
            <div class="flex justify-between items-center mb-3">
              <h5 class="text-sm font-medium text-gray-900">Contact {{ index + 1 }}</h5>
              <button
                type="button"
                @click="removeContact(index)"
                class="text-red-600 hover:text-red-800"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  v-model="contact.firstName"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Jane"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  v-model="contact.lastName"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Smith"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  v-model="contact.position"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Assistant"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="contact.email"
                  type="email"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="jane.smith@example.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  v-model="contact.phone"
                  type="tel"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="+1-555-111-2222"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <input
                  v-model="contact.mobile"
                  type="tel"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="+1-555-333-4444"
                />
              </div>
            </div>

            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                v-model="contact.notes"
                rows="2"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Additional notes about this contact"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Information Tab -->
      <div v-if="activeTab === 'financial'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Financial Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
            <input
              v-model="formData.financial.estimatedValue"
              type="number"
              min="0"
              step="0.01"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="50000.00"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
            <select
              v-model="formData.financial.currency"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Currency</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
            <input
              v-model="formData.financial.probability"
              type="number"
              min="0"
              max="100"
              step="1"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="75"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
            <input
              v-model="formData.financial.expectedCloseDate"
              type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            <input
              v-model="formData.financial.budget"
              type="number"
              min="0"
              step="0.01"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="60000.00"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Decision Maker</label>
            <input
              v-model="formData.financial.decisionMaker"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="John Smith"
            />
          </div>
        </div>
      </div>

      <!-- Additional Information Tab -->
      <div v-if="activeTab === 'additional'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Additional Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Assigned Sales Rep</label>
            <input
              v-model="formData.assignedSalesRep"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Sales Representative Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
            <input
              v-model="formData.assignedTo"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Team Member Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
            <input
              v-model="formData.campaign"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Marketing Campaign Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Next Follow-up Date</label>
            <input
              v-model="formData.nextFollowUpDate"
              type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            v-model="tagsInput"
            type="text"
            @keydown.enter.prevent="addTag"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter tags separated by commas or press Enter"
          />
          <div class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="inline-flex items-center px-2 py-1 text-xs font-medium bg-sap-blue text-white rounded-full"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-1 text-white hover:text-gray-200"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="handleCancel"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="props.loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ props.loading ? 'Saving...' : isEdit ? 'Update Lead' : 'Create Lead' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue'
import { LeadStatus, LeadSource, LeadPriority, LeadType, Currency } from '../types'
import type { Lead, LeadFormData } from '../types'

interface Props {
  lead?: Lead | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: LeadFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  lead: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const isEdit = computed(() => !!props.lead)

// Tab management
const activeTab = ref('basic')
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'contact', name: 'Contact Information' },
  { id: 'financial', name: 'Financial Information' },
  { id: 'additional', name: 'Additional Information' },
]

// Form data
const formData = reactive<LeadFormData>({
  leadCode: '',
  companyName: '',
  leadName: '',
  status: LeadStatus.NEW,
  source: LeadSource.WEBSITE,
  priority: LeadPriority.MEDIUM,
  type: LeadType.PROSPECT,
  industry: '',
  website: '',
  phone: '',
  email: '',
  fax: '',
  addresses: [],
  contacts: [],
  financial: {
    estimatedValue: 0,
    currency: Currency.USD,
    probability: 50,
    expectedCloseDate: '',
    budget: 0,
    decisionMaker: '',
  },
  notes: '',
  tags: [],
  assignedSalesRep: '',
  assignedTo: '',
  campaign: '',
  nextFollowUpDate: '',
})

// Primary contact (not in LeadFormData, so we'll handle it separately)
const primaryContact = reactive({
  firstName: '',
  lastName: '',
  position: '',
  email: '',
  phone: '',
  mobile: '',
  notes: '',
})

// Tags input
const tagsInput = ref('')

// Methods
const addContact = () => {
  formData.contacts.push({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    mobile: '',
    isPrimary: false,
    notes: '',
  })
}

const removeContact = (index: number) => {
  formData.contacts.splice(index, 1)
}

const addTag = () => {
  const tag = tagsInput.value.trim()
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
    tagsInput.value = ''
  }
}

const removeTag = (index: number) => {
  formData.tags.splice(index, 1)
}

const resetForm = () => {
  formData.leadCode = ''
  formData.companyName = ''
  formData.leadName = ''
  formData.status = LeadStatus.NEW
  formData.source = LeadSource.WEBSITE
  formData.priority = LeadPriority.MEDIUM
  formData.type = LeadType.PROSPECT
  formData.industry = ''
  formData.website = ''
  formData.phone = ''
  formData.email = ''
  formData.fax = ''
  formData.addresses = []
  formData.contacts = []
  formData.financial.estimatedValue = 0
  formData.financial.currency = Currency.USD
  formData.financial.probability = 50
  formData.financial.expectedCloseDate = ''
  formData.financial.budget = 0
  formData.financial.decisionMaker = ''
  formData.notes = ''
  formData.tags = []
  formData.assignedSalesRep = ''
  formData.assignedTo = ''
  formData.campaign = ''
  formData.nextFollowUpDate = ''

  // Reset primary contact
  primaryContact.firstName = ''
  primaryContact.lastName = ''
  primaryContact.position = ''
  primaryContact.email = ''
  primaryContact.phone = ''
  primaryContact.mobile = ''
  primaryContact.notes = ''
}

// Watch for lead changes to populate form
watch(
  () => props.lead,
  (lead) => {
    if (lead) {
      // Populate form with lead data
      formData.leadCode = lead.leadCode
      formData.companyName = lead.companyName
      formData.leadName = lead.leadName
      formData.status = lead.status
      formData.source = lead.source
      formData.priority = lead.priority
      formData.type = lead.type
      formData.industry = lead.industry || ''
      formData.website = lead.website || ''
      formData.phone = lead.phone
      formData.email = lead.email
      formData.fax = lead.fax || ''
      formData.addresses = lead.addresses.map(({ id, ...address }) => address)
      formData.contacts = lead.contacts.map(({ id, ...contact }) => contact)
      formData.financial.estimatedValue = lead.financial.estimatedValue
      formData.financial.currency = lead.financial.currency
      formData.financial.probability = lead.financial.probability
      formData.financial.expectedCloseDate = lead.financial.expectedCloseDate || ''
      formData.financial.budget = lead.financial.budget || 0
      formData.financial.decisionMaker = lead.financial.decisionMaker || ''
      formData.notes = lead.notes || ''
      formData.tags = [...lead.tags]
      formData.assignedSalesRep = lead.assignedSalesRep || ''
      formData.assignedTo = lead.assignedTo || ''
      formData.campaign = lead.campaign || ''
      formData.nextFollowUpDate = lead.nextFollowUpDate || ''

      // Set primary contact from first primary contact
      const primary = lead.contacts.find((c) => c.isPrimary)
      if (primary) {
        primaryContact.firstName = primary.firstName
        primaryContact.lastName = primary.lastName
        primaryContact.position = primary.position
        primaryContact.email = primary.email
        primaryContact.phone = primary.phone
        primaryContact.mobile = primary.mobile || ''
        primaryContact.notes = primary.notes || ''
      }
    } else {
      // Reset form for new lead
      resetForm()
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  try {
    // Validate required fields
    if (!formData.leadCode.trim()) {
      alert('Lead code is required')
      return
    }
    if (!formData.companyName.trim()) {
      alert('Company name is required')
      return
    }
    if (!formData.leadName.trim()) {
      alert('Lead name is required')
      return
    }
    if (!formData.phone.trim()) {
      alert('Phone is required')
      return
    }
    if (!formData.email.trim()) {
      alert('Email is required')
      return
    }
    if (!primaryContact.firstName.trim()) {
      alert('Primary contact first name is required')
      return
    }
    if (!primaryContact.lastName.trim()) {
      alert('Primary contact last name is required')
      return
    }
    if (!primaryContact.email.trim()) {
      alert('Primary contact email is required')
      return
    }
    if (!primaryContact.phone.trim()) {
      alert('Primary contact phone is required')
      return
    }

    // Add primary contact to contacts array
    const contactsWithPrimary = [
      {
        ...primaryContact,
        isPrimary: true,
      },
      ...formData.contacts,
    ]

    emit('submit', { ...formData, contacts: contactsWithPrimary })
  } catch (error) {
    console.error('Form submission error:', error)
    alert('An error occurred while submitting the form')
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>
