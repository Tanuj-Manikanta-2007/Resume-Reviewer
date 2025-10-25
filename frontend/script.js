// Configuration
const BACKEND_URL = "https://resume-reviewer-tl5t.onrender.com"
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// DOM elements
const fileInput = document.getElementById("fileInput")
const uploadArea = document.getElementById("uploadArea")
const uploadText = document.getElementById("uploadText")
const errorMessage = document.getElementById("errorMessage")
const errorText = document.getElementById("errorText")
const submitBtn = document.getElementById("submitBtn")
const submitText = document.getElementById("submitText")
const resultsSection = document.getElementById("resultsSection")
const resultsContent = document.getElementById("resultsContent")

// State
let selectedFile = null

// File input change handler
fileInput.addEventListener("change", (e) => {
  const file = e.target.files?.[0]
  if (file) {
    handleFileSelect(file)
  }
})

// Drag and drop handlers
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault()
  uploadArea.classList.add("drag-over")
})

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("drag-over")
})

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault()
  uploadArea.classList.remove("drag-over")
  const file = e.dataTransfer.files?.[0]
  if (file) {
    handleFileSelect(file)
  }
})

// Handle file selection
function handleFileSelect(file) {
  // Validate file type
  if (file.type !== "application/pdf") {
    showError("Please select a PDF file")
    return
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    showError("File size must be less than 10MB")
    return
  }

  selectedFile = file
  clearError()
  updateUploadUI()
  submitBtn.disabled = false
}

// Update upload UI
function updateUploadUI() {
  if (selectedFile) {
    uploadText.innerHTML = `<span class="file-name">${selectedFile.name}</span>`
  } else {
    uploadText.innerHTML = "Click to upload or drag and drop"
  }
}

// Show error
function showError(message) {
  errorText.textContent = message
  errorMessage.classList.remove("hidden")
  selectedFile = null
  updateUploadUI()
  submitBtn.disabled = true
}

// Clear error
function clearError() {
  errorMessage.classList.add("hidden")
  errorText.textContent = ""
}

// Submit handler
submitBtn.addEventListener("click", async () => {
  if (!selectedFile) {
    showError("Please select a PDF file first")
    return
  }

  await analyzeResume()
})

// Analyze resume
async function analyzeResume() {
  submitBtn.disabled = true
  clearError()
  resultsSection.classList.add("hidden")

  // Show loading state
  const originalText = submitText.textContent
  submitText.textContent = "Analyzing Resume..."
  const spinner = document.createElement("div")
  spinner.className = "spinner"
  submitBtn.insertBefore(spinner, submitBtn.firstChild)

  try {
    const formData = new FormData()
    formData.append("file", selectedFile)

    const response = await fetch(`${BACKEND_URL}/analyseFile`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }

    const data = await response.json()
    displayResults(data.summary)
  } catch (err) {
    console.error("[v0] Error:", err)
    showError("Error uploading file. Please try again.")
  } finally {
    // Reset button state
    submitText.textContent = originalText
    spinner.remove()
    submitBtn.disabled = false
  }
}

// Format and display results
function displayResults(text) {
  const lines = text.split("\n")
  resultsContent.innerHTML = ""

  lines.forEach((line) => {
    const trimmed = line.trim()

    // Section headers (lines ending with :)
    if (trimmed.endsWith(":")) {
      const header = document.createElement("div")
      header.className = "result-section-header"
      header.textContent = trimmed
      resultsContent.appendChild(header)
    }
    // Bullet points
    else if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
      const bullet = document.createElement("div")
      bullet.className = "result-bullet"

      const point = document.createElement("span")
      point.className = "result-bullet-point"
      point.textContent = "•"

      const text = document.createElement("span")
      text.className = "result-bullet-text"
      text.textContent = trimmed.substring(1).trim()

      bullet.appendChild(point)
      bullet.appendChild(text)
      resultsContent.appendChild(bullet)
    }
    // Numbered items
    else if (/^\d+\./.test(trimmed)) {
      const numbered = document.createElement("div")
      numbered.className = "result-numbered"

      const number = document.createElement("span")
      number.className = "result-number"
      number.textContent = trimmed.match(/^\d+\./)[0]

      const text = document.createElement("span")
      text.className = "result-bullet-text"
      text.textContent = trimmed.replace(/^\d+\.\s*/, "")

      numbered.appendChild(number)
      numbered.appendChild(text)
      resultsContent.appendChild(numbered)
    }
    // Empty lines
    else if (trimmed === "") {
      const empty = document.createElement("div")
      empty.className = "result-empty-line"
      resultsContent.appendChild(empty)
    }
    // Regular text
    else {
      const p = document.createElement("p")
      p.className = "result-text"
      p.textContent = line
      resultsContent.appendChild(p)
    }
  })

  resultsSection.classList.remove("hidden")
}
