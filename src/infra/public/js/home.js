timezones = Intl.supportedValuesOf("timeZone");
const select = document.getElementById("timezone");
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
timezones.forEach((timezone) => {
  const option = document.createElement("option");
  option.value = timezone;
  option.textContent = timezone;
  if (timezone === userTimeZone) option.selected = true;
  select.appendChild(option);
});

const dropdown = document.querySelector(".dropdown");
const content = document.querySelector(".dropdown-content");
const arrowIcon = document.querySelector(".arrow");
const removeIcons = document.querySelectorAll(".remove-icon");
const inputTopics = document.querySelectorAll(
  '.dropdown-content input[type="checkbox"]',
);

const selectedTopics = document.querySelector(".select-topics");
dropdown.addEventListener("click", () => {
  content.classList.toggle("open");
  arrowIcon.classList.toggle("open");
});

inputTopics.forEach((input) => {
  input.addEventListener("change", () => {
    const topic = input.value;
    if (input.checked) {
      const topicSpan = document.createElement("span");
      const topicIcon = document.createElement("i");
      topicSpan.classList.add("topic-item");
      topicSpan.textContent = topic;
      topicIcon.classList.add("fa-solid", "fa-xmark", "remove-icon");
      topicSpan.appendChild(topicIcon);
      selectedTopics.appendChild(topicSpan);
    } else {
      const topicSpans = selectedTopics.querySelectorAll(".topic-item");
      topicSpans.forEach((span) => {
        if (span.firstChild.textContent === topic) {
          span.remove();
        }
      });
    }
  });
});

selectedTopics.addEventListener("click", (e) => {
  const icon = e.target.closest(".remove-icon");
  if (!icon) return;
  const topicSpan = icon.parentElement;
  const topicValue = topicSpan.firstChild.textContent;
  const correspondingInput = document.querySelector(
    `.dropdown-content input[value="${topicValue}"]`,
  );
  if (correspondingInput) correspondingInput.checked = false;
  topicSpan.remove();
});
