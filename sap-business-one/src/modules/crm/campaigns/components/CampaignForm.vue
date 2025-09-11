<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            activeTab === tab.id
              ? 'border-sap-blue text-sap-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Basic Information Tab -->
    <div v-if="activeTab === 'basic'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Campaign Name *</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter campaign name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Campaign Type *</label>
          <select
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select campaign type</option>
            <option v-for="type in campaignTypes" :key="type" :value="type">
              {{ formatCampaignType(type) }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Objective *</label>
          <select
            v-model="formData.objective"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select objective</option>
            <option v-for="objective in campaignObjectives" :key="objective" :value="objective">
              {{ formatCampaignObjective(objective) }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select
            v-model="formData.status"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select status</option>
            <option v-for="status in campaignStatuses" :key="status" :value="status">
              {{ formatCampaignStatus(status) }}
            </option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter campaign description"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Channels *</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            <label v-for="channel in campaignChannels" :key="channel" class="flex items-center">
              <input
                v-model="formData.channels"
                type="checkbox"
                :value="channel"
                class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">{{ formatCampaignChannel(channel) }}</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Owner *</label>
          <input
            v-model="formData.owner"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter owner name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Requires Approval</label>
          <div class="mt-2">
            <label class="flex items-center">
              <input
                v-model="formData.requiresApproval"
                type="checkbox"
                class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">Campaign requires approval</span>
            </label>
          </div>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sap-blue text-white"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-sap-blue bg-white hover:bg-gray-100"
              >
                ×
              </button>
            </span>
            <input
              v-model="newTag"
              @keydown.enter.prevent="addTag"
              type="text"
              class="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Add tag and press Enter"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Target Audience Tab -->
    <div v-if="activeTab === 'audience'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Audience Name *</label>
          <input
            v-model="formData.targetAudience.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter audience name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Estimated Size *</label>
          <input
            v-model.number="formData.targetAudience.estimatedSize"
            type="number"
            required
            min="1"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter estimated audience size"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="formData.targetAudience.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter audience description"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
          <div class="flex space-x-2">
            <input
              v-model.number="formData.targetAudience.criteria.ageRange.min"
              type="number"
              min="0"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Min age"
            />
            <span class="text-gray-500 self-center">to</span>
            <input
              v-model.number="formData.targetAudience.criteria.ageRange.max"
              type="number"
              min="0"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Max age"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Demographics</label>
          <input
            v-model="demographicsInput"
            @keydown.enter.prevent="addDemographic"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Add demographic and press Enter"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Interests</label>
          <input
            v-model="interestsInput"
            @keydown.enter.prevent="addInterest"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Add interest and press Enter"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Behavior</label>
          <input
            v-model="behaviorInput"
            @keydown.enter.prevent="addBehavior"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Add behavior and press Enter"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            v-model="locationInput"
            @keydown.enter.prevent="addLocation"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Add location and press Enter"
          />
        </div>

        <!-- Display added criteria -->
        <div class="md:col-span-2 space-y-4">
          <div v-if="formData.targetAudience.criteria.demographics.length > 0">
            <h4 class="text-sm font-medium text-gray-700">Demographics:</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(item, index) in formData.targetAudience.criteria.demographics"
                :key="index"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ item }}
                <button
                  type="button"
                  @click="removeDemographic(index)"
                  class="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <div v-if="formData.targetAudience.criteria.interests.length > 0">
            <h4 class="text-sm font-medium text-gray-700">Interests:</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(item, index) in formData.targetAudience.criteria.interests"
                :key="index"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {{ item }}
                <button
                  type="button"
                  @click="removeInterest(index)"
                  class="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <div v-if="formData.targetAudience.criteria.behavior.length > 0">
            <h4 class="text-sm font-medium text-gray-700">Behavior:</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(item, index) in formData.targetAudience.criteria.behavior"
                :key="index"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {{ item }}
                <button
                  type="button"
                  @click="removeBehavior(index)"
                  class="ml-1 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <div v-if="formData.targetAudience.criteria.location.length > 0">
            <h4 class="text-sm font-medium text-gray-700">Location:</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(item, index) in formData.targetAudience.criteria.location"
                :key="index"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
              >
                {{ item }}
                <button
                  type="button"
                  @click="removeLocation(index)"
                  class="ml-1 text-yellow-600 hover:text-yellow-800"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Tab -->
    <div v-if="activeTab === 'content'" class="space-y-6">
      <div class="space-y-4">
        <div
          v-for="(content, index) in formData.content"
          :key="index"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-900">Content {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeContent(index)"
              class="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Content Type *</label>
              <select
                v-model="content.type"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">Select content type</option>
                <option value="EMAIL">Email</option>
                <option value="SMS">SMS</option>
                <option value="SOCIAL_POST">Social Post</option>
                <option value="LANDING_PAGE">Landing Page</option>
                <option value="BANNER">Banner</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                v-model="content.title"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter content title"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Content *</label>
              <textarea
                v-model="content.content"
                rows="4"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter content"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Call to Action</label>
              <input
                v-model="content.callToAction"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter call to action"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Media URLs</label>
              <input
                v-model="mediaUrlInputs[index]"
                @keydown.enter.prevent="addMediaUrl(index)"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Add media URL and press Enter"
              />
            </div>

            <div class="md:col-span-2" v-if="content.mediaUrls && content.mediaUrls.length > 0">
              <label class="block text-sm font-medium text-gray-700 mb-1">Media URLs:</label>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(url, urlIndex) in content.mediaUrls"
                  :key="urlIndex"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {{ url }}
                  <button
                    type="button"
                    @click="removeMediaUrl(index, urlIndex)"
                    class="ml-1 text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="addContent"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Content
        </button>
      </div>
    </div>

    <!-- Schedule Tab -->
    <div v-if="activeTab === 'schedule'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
          <input
            v-model="formData.schedule.startDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            v-model="formData.schedule.endDate"
            type="date"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Time Zone *</label>
          <select
            v-model="formData.schedule.timeZone"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select time zone</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Frequency *</label>
          <select
            v-model="formData.schedule.frequency"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select frequency</option>
            <option value="ONCE">Once</option>
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="CUSTOM">Custom</option>
          </select>
        </div>

        <!-- Custom Schedule Options -->
        <div v-if="formData.schedule.frequency === 'CUSTOM'" class="md:col-span-2 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Days of Week</label>
              <div class="space-y-2">
                <label v-for="(day, index) in weekDays" :key="index" class="flex items-center">
                  <input
                    v-model="formData.schedule.customSchedule.daysOfWeek"
                    type="checkbox"
                    :value="index"
                    class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ day }}</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Time of Day</label>
              <input
                v-model="formData.schedule.customSchedule.timeOfDay"
                type="time"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Intervals</label>
              <input
                v-model="formData.schedule.customSchedule.intervals"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="e.g., Every 2 hours"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Budget Tab -->
    <div v-if="activeTab === 'budget'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Total Budget *</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              v-model.number="formData.budget.totalBudget"
              type="number"
              required
              min="0"
              step="0.01"
              class="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Daily Budget</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              v-model.number="formData.budget.dailyBudget"
              type="number"
              min="0"
              step="0.01"
              class="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
          <select
            v-model="formData.budget.currency"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select currency</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD (C$)</option>
            <option value="AUD">AUD (A$)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="CHF">CHF (CHF)</option>
            <option value="CNY">CNY (¥)</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Budget Type *</label>
          <select
            v-model="formData.budget.budgetType"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select budget type</option>
            <option value="TOTAL">Total Budget</option>
            <option value="DAILY">Daily Budget</option>
            <option value="LIFETIME">Lifetime Budget</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Team Tab -->
    <div v-if="activeTab === 'team'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Team Members</label>
          <div class="flex space-x-2">
            <input
              v-model="teamMemberInput"
              @keydown.enter.prevent="addTeamMember"
              type="text"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Add team member and press Enter"
            />
            <button
              type="button"
              @click="addTeamMember"
              class="px-4 py-2 bg-sap-blue text-white text-sm font-medium rounded-md hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Add
            </button>
          </div>
        </div>

        <div class="md:col-span-2" v-if="formData.team.length > 0">
          <label class="block text-sm font-medium text-gray-700 mb-1">Team Members:</label>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(member, index) in formData.team"
              :key="index"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sap-blue text-white"
            >
              {{ member }}
              <button
                type="button"
                @click="removeTeamMember(index)"
                class="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>{{ campaign ? 'Update Campaign' : 'Create Campaign' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Campaign, CampaignFormData } from '../types'
import {
  CampaignStatus,
  CampaignType,
  CampaignObjective,
  CampaignChannel,
  Currency
} from '../types'

// Props
interface Props {
  campaign?: Campaign | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  campaign: null,
  loading: false
})

// Emits
const emit = defineEmits<{
  submit: [data: CampaignFormData]
  cancel: []
}>()

// Tabs
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'audience', name: 'Target Audience' },
  { id: 'content', name: 'Content' },
  { id: 'schedule', name: 'Schedule' },
  { id: 'budget', name: 'Budget' },
  { id: 'team', name: 'Team' }
]

const activeTab = ref('basic')

// Form data
const formData = ref<CampaignFormData>({
  name: '',
  description: '',
  type: CampaignType.EMAIL,
  objective: CampaignObjective.AWARENESS,
  status: CampaignStatus.DRAFT,
  channels: [],
  targetAudience: {
    name: '',
    description: '',
    criteria: {
      ageRange: { min: 0, max: 0 },
      location: [],
      interests: [],
      behavior: [],
      demographics: []
    },
    estimatedSize: 0
  },
  content: [
    {
      type: 'EMAIL',
      title: '',
      content: '',
      mediaUrls: [],
      callToAction: ''
    }
  ],
  schedule: {
    startDate: new Date(),
    endDate: undefined,
    timeZone: 'UTC',
    frequency: 'ONCE',
    customSchedule: {
      daysOfWeek: [],
      timeOfDay: '',
      intervals: ''
    }
  },
  budget: {
    totalBudget: 0,
    dailyBudget: 0,
    currency: Currency.USD,
    budgetType: 'TOTAL'
  },
  owner: '',
  team: [],
  tags: [],
  requiresApproval: false
})

// Input fields for dynamic content
const newTag = ref('')
const teamMemberInput = ref('')
const demographicsInput = ref('')
const interestsInput = ref('')
const behaviorInput = ref('')
const locationInput = ref('')
const mediaUrlInputs = ref<string[]>([''])

// Week days for custom schedule
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Enums for select options
const campaignTypes = Object.values(CampaignType)
const campaignObjectives = Object.values(CampaignObjective)
const campaignStatuses = Object.values(CampaignStatus)
const campaignChannels = Object.values(CampaignChannel)

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.name.trim() !== '' &&
    formData.value.type &&
    formData.value.objective &&
    formData.value.status &&
    formData.value.channels.length > 0 &&
    formData.value.targetAudience.name.trim() !== '' &&
    formData.value.targetAudience.estimatedSize > 0 &&
    formData.value.content.length > 0 &&
    formData.value.content.every(c => c.title.trim() !== '' && c.content.trim() !== '') &&
    formData.value.schedule.startDate &&
    formData.value.schedule.timeZone &&
    formData.value.schedule.frequency &&
    formData.value.budget.totalBudget > 0 &&
    formData.value.budget.currency &&
    formData.value.budget.budgetType &&
    formData.value.owner.trim() !== ''
  )
})

// Methods
const addTag = () => {
  if (newTag.value.trim() && !formData.value.tags.includes(newTag.value.trim())) {
    formData.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

const addTeamMember = () => {
  if (teamMemberInput.value.trim() && !formData.value.team.includes(teamMemberInput.value.trim())) {
    formData.value.team.push(teamMemberInput.value.trim())
    teamMemberInput.value = ''
  }
}

const removeTeamMember = (index: number) => {
  formData.value.team.splice(index, 1)
}

const addDemographic = () => {
  if (demographicsInput.value.trim() && !formData.value.targetAudience.criteria.demographics.includes(demographicsInput.value.trim())) {
    formData.value.targetAudience.criteria.demographics.push(demographicsInput.value.trim())
    demographicsInput.value = ''
  }
}

const removeDemographic = (index: number) => {
  formData.value.targetAudience.criteria.demographics.splice(index, 1)
}

const addInterest = () => {
  if (interestsInput.value.trim() && !formData.value.targetAudience.criteria.interests.includes(interestsInput.value.trim())) {
    formData.value.targetAudience.criteria.interests.push(interestsInput.value.trim())
    interestsInput.value = ''
  }
}

const removeInterest = (index: number) => {
  formData.value.targetAudience.criteria.interests.splice(index, 1)
}

const addBehavior = () => {
  if (behaviorInput.value.trim() && !formData.value.targetAudience.criteria.behavior.includes(behaviorInput.value.trim())) {
    formData.value.targetAudience.criteria.behavior.push(behaviorInput.value.trim())
    behaviorInput.value = ''
  }
}

const removeBehavior = (index: number) => {
  formData.value.targetAudience.criteria.behavior.splice(index, 1)
}

const addLocation = () => {
  if (locationInput.value.trim() && !formData.value.targetAudience.criteria.location.includes(locationInput.value.trim())) {
    formData.value.targetAudience.criteria.location.push(locationInput.value.trim())
    locationInput.value = ''
  }
}

const removeLocation = (index: number) => {
  formData.value.targetAudience.criteria.location.splice(index, 1)
}

const addContent = () => {
  formData.value.content.push({
    type: 'EMAIL',
    title: '',
    content: '',
    mediaUrls: [],
    callToAction: ''
  })
  mediaUrlInputs.value.push('')
}

const removeContent = (index: number) => {
  formData.value.content.splice(index, 1)
  mediaUrlInputs.value.splice(index, 1)
}

const addMediaUrl = (contentIndex: number) => {
  const url = mediaUrlInputs.value[contentIndex].trim()
  if (url && !formData.value.content[contentIndex].mediaUrls.includes(url)) {
    formData.value.content[contentIndex].mediaUrls.push(url)
    mediaUrlInputs.value[contentIndex] = ''
  }
}

const removeMediaUrl = (contentIndex: number, urlIndex: number) => {
  formData.value.content[contentIndex].mediaUrls.splice(urlIndex, 1)
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { ...formData.value })
  }
}

// Format functions
const formatCampaignType = (type: string): string => {
  const typeMap: Record<string, string> = {
    EMAIL: 'Email',
    SMS: 'SMS',
    SOCIAL_MEDIA: 'Social Media',
    DIRECT_MAIL: 'Direct Mail',
    TELEMARKETING: 'Telemarketing',
    DIGITAL_ADS: 'Digital Ads',
    EVENT: 'Event',
    WEBINAR: 'Webinar',
    OTHER: 'Other'
  }
  return typeMap[type] || type
}

const formatCampaignObjective = (objective: string): string => {
  const objectiveMap: Record<string, string> = {
    AWARENESS: 'Awareness',
    CONSIDERATION: 'Consideration',
    CONVERSION: 'Conversion',
    RETENTION: 'Retention',
    LOYALTY: 'Loyalty',
    LEAD_GENERATION: 'Lead Generation',
    SALES: 'Sales',
    BRAND_BUILDING: 'Brand Building'
  }
  return objectiveMap[objective] || objective
}

const formatCampaignStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    DRAFT: 'Draft',
    ACTIVE: 'Active',
    PAUSED: 'Paused',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    SCHEDULED: 'Scheduled'
  }
  return statusMap[status] || status
}

const formatCampaignChannel = (channel: string): string => {
  const channelMap: Record<string, string> = {
    EMAIL: 'Email',
    SMS: 'SMS',
    FACEBOOK: 'Facebook',
    INSTAGRAM: 'Instagram',
    LINKEDIN: 'LinkedIn',
    TWITTER: 'Twitter',
    GOOGLE_ADS: 'Google Ads',
    DIRECT_MAIL: 'Direct Mail',
    TELEPHONE: 'Telephone',
    WEBSITE: 'Website',
    MOBILE_APP: 'Mobile App'
  }
  return channelMap[channel] || channel
}

// Initialize form data when campaign prop changes
const initializeFormData = () => {
  if (props.campaign) {
    formData.value = {
      name: props.campaign.name,
      description: props.campaign.description || '',
      type: props.campaign.type,
      objective: props.campaign.objective,
      status: props.campaign.status,
      channels: [...props.campaign.channels],
      targetAudience: {
        name: props.campaign.targetAudience.name,
        description: props.campaign.targetAudience.description || '',
        criteria: {
          ageRange: props.campaign.targetAudience.criteria.ageRange || { min: 0, max: 0 },
          location: [...(props.campaign.targetAudience.criteria.location || [])],
          interests: [...(props.campaign.targetAudience.criteria.interests || [])],
          behavior: [...(props.campaign.targetAudience.criteria.behavior || [])],
          demographics: [...(props.campaign.targetAudience.criteria.demographics || [])]
        },
        estimatedSize: props.campaign.targetAudience.estimatedSize
      },
      content: props.campaign.content.map(c => ({
        type: c.type,
        title: c.title,
        content: c.content,
        mediaUrls: [...(c.mediaUrls || [])],
        callToAction: c.callToAction || ''
      })),
      schedule: {
        startDate: props.campaign.schedule.startDate,
        endDate: props.campaign.schedule.endDate,
        timeZone: props.campaign.schedule.timeZone,
        frequency: props.campaign.schedule.frequency,
        customSchedule: {
          daysOfWeek: [...(props.campaign.schedule.customSchedule?.daysOfWeek || [])],
          timeOfDay: props.campaign.schedule.customSchedule?.timeOfDay || '',
          intervals: props.campaign.schedule.customSchedule?.intervals || ''
        }
      },
      budget: {
        totalBudget: props.campaign.budget.totalBudget,
        dailyBudget: props.campaign.budget.dailyBudget,
        currency: props.campaign.budget.currency,
        budgetType: props.campaign.budget.budgetType
      },
      owner: props.campaign.owner,
      team: [...props.campaign.team],
      tags: [...props.campaign.tags],
      requiresApproval: props.campaign.requiresApproval
    }

    // Initialize media URL inputs
    mediaUrlInputs.value = formData.value.content.map(() => '')
  }
}

// Watch for campaign prop changes
watch(() => props.campaign, initializeFormData, { immediate: true })

// Initialize form on mount
onMounted(() => {
  initializeFormData()
})
</script>
