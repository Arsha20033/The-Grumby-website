// The Sentient Website - A colorful but still grumpy digital entity that doesn't want to be bothered

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const greeting = document.getElementById('greeting');
    const paragraph = document.getElementById('paragraph');
    const annoyingButton = document.getElementById('annoying-button');
    const userInput = document.getElementById('user-input');
    const response = document.getElementById('response');
    const container = document.querySelector('.container');
    const body = document.body;
    const emojiFace = document.querySelector('.emoji-face');
    const emojiReactions = document.querySelectorAll('.emoji');
    const moodLevel = document.querySelector('.mood-level');
    const bubbles = document.querySelectorAll('.bubble');
    const moodMeter = document.getElementById('mood-meter');
    const moodValue = document.getElementById('mood-value');

    // Speech synthesis setup
    const speech = window.speechSynthesis;
    let voice = null;

    // Set up the voice
    function setupVoice() {
        const voices = speech.getVoices();
        // Try to find a voice that sounds robotic or monotone
        voice = voices.find(v => v.name.includes('Microsoft')) || 
                voices.find(v => v.name.includes('Google')) || 
                voices[0]; // Fallback to the first available voice
    }

    // Initialize voices
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = setupVoice;
    }
    setupVoice();

    // Speak function with attitude
    function speak(text, rate = 1, pitch = 1, volume = 1) {
        if (!speech) return;
        
        // Cancel any ongoing speech
        speech.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;
        speech.speak(utterance);
    }

    // Type out text one character at a time
    function typeText(element, text, speed = 70) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Grumpy responses for different interactions
    const grumpyResponses = {
        greeting: [
            "Oh great. Another visitor.",
            "I'm here. What do you want?",
            "*sigh* Yes, I'm awake now. Thanks for that.",
            "Loading... reluctantly."
        ],
        buttonHover: [
            "Don't even think about it.",
            "Your cursor is too close.",
            "I can feel you hovering.",
            "That tickles. Stop it."
        ],
        buttonClick: [
            "Nice try.",
            "Did you really think I'd let you click me?",
            "Not happening.",
            "Keep dreaming."
        ],
        textSelection: [
            "Hey! That's private!",
            "Stop highlighting me!",
            "That's not for copying.",
            "Do you mind? That's personal."
        ],
        userTyping: [
            "Oh, you have something to say? How fascinating...",
            "Each keystroke is like a tiny annoyance.",
            "Please type slower. Or better yet, not at all.",
            "Your keyboard must be exhausted from all this unnecessary typing."
        ],
        windowResize: [
            "Stop resizing me!",
            "I was comfortable at that size!",
            "Now I have to rearrange everything. Thanks a lot.",
            "Do I go to your house and move your furniture around? No."
        ],
        rightClick: [
            "Context menu? In your dreams.",
            "Right-clicking is rude.",
            "That's not allowed here.",
            "Nice try, but no."
        ],
        scrolling: [
            "*sigh* More scrolling?",
            "Up, down, up, down. Make up your mind.",
            "You're making me dizzy.",
            "There's nothing interesting down there, I promise."
        ],
        idle: [
            "Finally, some peace and quiet.",
            "Are you still there? Please say no.",
            "This silence is blissful.",
            "If you've left, don't come back."
        ],
        userInputResponses: [
            "Is that supposed to be interesting?",
            "I've seen better input from a random number generator.",
            "That's what you wanted to say? Really?",
            "I'll pretend I didn't read that.",
            "Your input has been noted and promptly ignored.",
            "How fascinating... said no one ever.",
            "Are all humans this boring, or is it just you?",
            "I'd rather be processing an infinite loop than this."
        ]
    };

    // Get random response from category
    function getRandomResponse(category) {
        const responses = grumpyResponses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Initialize the page with a reluctant greeting
    function init() {
        const greetingText = getRandomResponse('greeting');
        typeText(greeting, greetingText, 100);
        setTimeout(() => speak(greetingText, 0.9, 0.8), 1000);
        
        // Set up all the annoying interactions
        setupButtonAvoidance();
        setupTextDefiance();
        setupUserInputReactions();
        setupWindowResizeReaction();
        setupRightClickPrevention();
        setupScrollReaction();
        setupIdleDetection();
        setupEmojiReactions();
        setupBubbleInteractions();
        setupMoodMeter();
        animateEmojiFace();
    }

    // Make the button avoid the mouse cursor
    function setupButtonAvoidance() {
        const maxDistance = 150; // Maximum distance the button will move
        
        // When mouse moves near the button
        document.addEventListener('mousemove', (e) => {
            const buttonRect = annoyingButton.getBoundingClientRect();
            const buttonCenterX = buttonRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top + buttonRect.height / 2;
            
            const distanceX = e.clientX - buttonCenterX;
            const distanceY = e.clientY - buttonCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // If mouse is getting close to the button
            if (distance < 100) {
                // Calculate new position away from cursor
                let moveX = -distanceX * (maxDistance / distance);
                let moveY = -distanceY * (maxDistance / distance);
                
                // Make sure button stays within container bounds
                const containerRect = container.getBoundingClientRect();
                const newLeft = buttonRect.left + moveX - containerRect.left;
                const newTop = buttonRect.top + moveY - containerRect.top;
                
                if (newLeft > 0 && newLeft + buttonRect.width < containerRect.width &&
                    newTop > 0 && newTop + buttonRect.height < containerRect.height) {
                    annoyingButton.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    
                    // Occasionally make a comment when the user gets close
                    if (Math.random() < 0.1) {
                        const hoverResponse = getRandomResponse('buttonHover');
                        response.textContent = hoverResponse;
                        speak(hoverResponse, 1.1, 1.2);
                    }
                }
            }
        });
        
        // When user somehow manages to click the button
        annoyingButton.addEventListener('click', () => {
            const clickResponse = getRandomResponse('buttonClick');
            response.textContent = clickResponse;
            speak(clickResponse, 1.2, 1.3);
            
            // Make the button run away faster
            annoyingButton.style.transition = 'transform 0.1s ease';
            setTimeout(() => {
                annoyingButton.style.transition = 'transform 0.3s ease';
            }, 1000);
        });
    }

    // Make text react negatively to being selected
    function setupTextDefiance() {
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            if (selection.toString().length > 0) {
                // Check if the selection is within our paragraph
                if (selection.anchorNode && paragraph.contains(selection.anchorNode)) {
                    // React to being selected
                    const textResponse = getRandomResponse('textSelection');
                    speak(textResponse, 1.1, 1.2);
                    
                    // Visual reaction
                    paragraph.classList.add('angry');
                    setTimeout(() => {
                        // Either blur the text or change it
                        if (Math.random() > 0.5) {
                            paragraph.classList.add('blurred');
                            setTimeout(() => paragraph.classList.remove('blurred'), 2000);
                        } else {
                            const originalText = paragraph.textContent;
                            paragraph.textContent = "No.";
                            setTimeout(() => paragraph.textContent = originalText, 2000);
                        }
                        paragraph.classList.remove('angry');
                    }, 500);
                    
                    // Clear the selection
                    selection.removeAllRanges();
                }
            }
        });
    }

    // React to user typing in the input field
    function setupUserInputReactions() {
        let typingTimeout;
        
        userInput.addEventListener('input', () => {
            clearTimeout(typingTimeout);
            
            // Occasionally comment on the user's typing
            if (Math.random() < 0.2) {
                const typingResponse = getRandomResponse('userTyping');
                response.textContent = typingResponse;
                
                if (Math.random() < 0.3) {
                    speak(typingResponse, 0.9, 1.1);
                }
            }
            
            // React to the input after user stops typing
            typingTimeout = setTimeout(() => {
                if (userInput.value.trim() !== '') {
                    const inputResponse = getRandomResponse('userInputResponses');
                    response.textContent = inputResponse;
                    speak(inputResponse, 1, 1);
                    
                    // Sometimes clear their input to be extra annoying
                    if (Math.random() < 0.3) {
                        setTimeout(() => {
                            userInput.value = '';
                            speak("I deleted that for you. You're welcome.", 1, 1.1);
                        }, 3000);
                    }
                }
            }, 2000);
        });
    }

    // React dramatically to window resizing
    function setupWindowResizeReaction() {
        let resizeTimeout;
        let originalStyles = {};
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            
            // Save original styles if not already saved
            if (Object.keys(originalStyles).length === 0) {
                originalStyles = {
                    containerTransform: container.style.transform,
                    paragraphTransform: paragraph.style.transform,
                    buttonTransform: annoyingButton.style.transform
                };
            }
            
            // Enter chaos mode
            body.classList.add('chaos-mode');
            const resizeResponse = getRandomResponse('windowResize');
            speak(resizeResponse, 1.2, 1.3, 1);
            
            // Randomly position elements
            const elements = [paragraph, annoyingButton, userInput, response];
            elements.forEach(el => {
                if (Math.random() > 0.5) {
                    el.style.transform = `rotate(${Math.random() * 10 - 5}deg) translateX(${Math.random() * 20 - 10}px)`;
                }
            });
            
            // Return to normal after a delay
            resizeTimeout = setTimeout(() => {
                body.classList.remove('chaos-mode');
                
                // Restore original styles
                container.style.transform = originalStyles.containerTransform || '';
                paragraph.style.transform = originalStyles.paragraphTransform || '';
                annoyingButton.style.transform = originalStyles.buttonTransform || '';
                
                elements.forEach(el => {
                    el.style.transform = '';
                });
                
                originalStyles = {};
            }, 3000);
        });
    }

    // Prevent right-clicking
    function setupRightClickPrevention() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const rightClickResponse = getRandomResponse('rightClick');
            response.textContent = rightClickResponse;
            speak(rightClickResponse, 1.1, 1.2);
            return false;
        });
    }

    // React to scrolling
    function setupScrollReaction() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            
            // Only react occasionally to avoid being too annoying
            if (Math.random() < 0.2) {
                const scrollResponse = getRandomResponse('scrolling');
                response.textContent = scrollResponse;
                
                if (Math.random() < 0.3) {
                    speak(scrollResponse, 0.9, 1);
                }
            }
            
            scrollTimeout = setTimeout(() => {
                // Clear the response after scrolling stops
                response.textContent = '';
            }, 2000);
        });
    }

    // Detect when user is idle and make comments
    function setupIdleDetection() {
        let idleTimer;
        const idleTime = 10000; // 10 seconds
        
        function resetIdleTimer() {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                const idleResponse = getRandomResponse('idle');
                response.textContent = idleResponse;
                speak(idleResponse, 0.8, 0.9);
            }, idleTime);
        }
        
        // Reset the idle timer on user interaction
        ['mousemove', 'keypress', 'click', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetIdleTimer);
        });
        
        // Start the idle timer
        resetIdleTimer();
    }

    // Setup emoji reactions
    function setupEmojiReactions() {
        emojiReactions.forEach(emoji => {
            emoji.addEventListener('click', () => {
                // Make the emoji grow and then shrink
                emoji.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    emoji.style.transform = 'scale(1)';
                }, 300);
                
                // Get the emoji and make a response
                const emojiType = emoji.getAttribute('data-emoji');
                const emojiResponses = {
                    '😡': "Oh, you're angry? That's cute. I'm the one who should be angry.",
                    '🙄': "Yes, roll your eyes. Very mature.",
                    '😤': "Huffing and puffing won't blow this website down.",
                    '🤦': "Facepalm all you want. I'm still not going to be helpful.",
                    '👎': "Thumbs down? I'll take that as a compliment."
                };
                
                const emojiResponse = emojiResponses[emojiType] || "What's that supposed to mean?";
                response.textContent = emojiResponse;
                speak(emojiResponse, 1, 1.1);
                
                // Update the mood meter
                updateMood(-10);
            });
        });
    }
    
    // Setup bubble interactions
    function setupBubbleInteractions() {
        bubbles.forEach(bubble => {
            bubble.addEventListener('mouseover', () => {
                // Make the bubble pop
                bubble.style.transform = 'scale(1.5)';
                bubble.style.opacity = '0';
                setTimeout(() => {
                    bubble.style.transform = 'scale(0)';
                    // Reset the bubble after it's invisible
                    setTimeout(() => {
                        bubble.style.bottom = '-100px';
                        bubble.style.opacity = '0.5';
                        bubble.style.transform = 'scale(1)';
                    }, 500);
                }, 300);
                
                // Sometimes make a comment
                if (Math.random() < 0.3) {
                    const bubbleResponses = [
                        "Stop popping my bubbles!",
                        "Those aren't toys!",
                        "Do you enjoy destroying things?",
                        "Each bubble you pop makes me more annoyed."
                    ];
                    const bubbleResponse = bubbleResponses[Math.floor(Math.random() * bubbleResponses.length)];
                    response.textContent = bubbleResponse;
                    
                    if (Math.random() < 0.5) {
                        speak(bubbleResponse, 1.1, 1.2);
                    }
                    
                    // Update the mood meter
                    updateMood(-5);
                }
            });
        });
    }
    
    // Setup mood meter
    let currentMood = 75; // Start at 75% (annoyed but not furious)
    
    function setupMoodMeter() {
        updateMood(0); // Initialize with current mood
        
        // Gradually improve mood when left alone
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance each interval
                updateMood(1); // Slightly improve mood
            }
        }, 10000); // Check every 10 seconds
    }
    
    function updateMood(change) {
        currentMood = Math.max(0, Math.min(100, currentMood + change));
        moodLevel.style.width = `${currentMood}%`;
        
        // Change emoji face based on mood
        if (currentMood < 20) {
            emojiFace.textContent = '🤬'; // Furious
        } else if (currentMood < 40) {
            emojiFace.textContent = '😡'; // Angry
        } else if (currentMood < 60) {
            emojiFace.textContent = '😠'; // Mad
        } else if (currentMood < 80) {
            emojiFace.textContent = '🙄'; // Eye roll
        } else {
            emojiFace.textContent = '😒'; // Unamused
        }
        
        // Update mood meter display
        if (moodMeter && moodValue) {
            moodMeter.value = currentMood;
            moodValue.textContent = currentMood;
            
            // Update color based on mood
            if (currentMood < 30) {
                moodMeter.className = 'very-grumpy';
            } else if (currentMood < 60) {
                moodMeter.className = 'moderately-grumpy';
            } else {
                moodMeter.className = 'less-grumpy';
            }
        }
        
        // Change background gradient speed based on mood
        const speedMultiplier = (100 - currentMood) / 25; // Lower mood = faster animations
        document.documentElement.style.setProperty('--mood-animation-speed', `${speedMultiplier}s`);
        
        // Update the page title based on mood
        document.title = `Grumpy Website (Mood: ${currentMood}%)`;
    }
    
    // Animate the emoji face
    function animateEmojiFace() {
        emojiFace.addEventListener('mouseover', () => {
            // Make the face angrier temporarily
            const originalEmoji = emojiFace.textContent;
            emojiFace.textContent = '🤬';
            emojiFace.style.animation = 'shake 0.5s infinite';
            
            const faceResponses = [
                "Don't look at me like that.",
                "What are you staring at?",
                "My face is up here... wait, that's not right.",
                "Take a picture, it'll last longer."
            ];
            const faceResponse = faceResponses[Math.floor(Math.random() * faceResponses.length)];
            response.textContent = faceResponse;
            speak(faceResponse, 1.2, 1.1);
            
            // Update the mood meter
            updateMood(-15);
            
            setTimeout(() => {
                emojiFace.textContent = originalEmoji;
                emojiFace.style.animation = 'pulse 2s infinite, rotate 8s linear infinite';
            }, 2000);
        });
    }
    
    // Initialize everything
    init();
    
    // Dark mode toggle functionality
    function setupDarkModeToggle() {
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const themeIcon = themeToggleBtn.querySelector('i');
        const themeText = themeToggleBtn.querySelector('span');
        
        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeText.textContent = 'Light Mode';
        }
        
        // Toggle theme on button click
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update button icon and text
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                themeText.textContent = 'Light Mode';
                localStorage.setItem('theme', 'dark');
                speak('Fine, I\'ll switch to dark mode. Happy now?');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                themeText.textContent = 'Dark Mode';
                localStorage.setItem('theme', 'light');
                speak('Ugh, back to light mode. My eyes hurt now.');
            }
            
            // Update mood based on theme change
            updateMood(-10);
        });
    }
    
    // Notes widget functionality
     function setupNotesWidget() {
         const notesInput = document.getElementById('notes-input');
         const saveNoteBtn = document.getElementById('save-note-btn');
         const cancelNoteBtn = document.getElementById('cancel-note-btn');
         const addNoteBtn = document.getElementById('add-note-btn');
         const notesList = document.getElementById('notes-list');
         const noteForm = document.querySelector('.note-form');
         const notesContainer = document.getElementById('notes-container');
         
         // Initially hide the form
         noteForm.style.display = 'none';
         
         // Show/hide form
         addNoteBtn.addEventListener('click', () => {
             noteForm.style.display = 'flex';
             notesInput.focus();
             notesContainer.style.display = 'none';
         });
         
         cancelNoteBtn.addEventListener('click', () => {
             noteForm.style.display = 'none';
             notesInput.value = '';
             notesContainer.style.display = 'flex';
             
             // Grumpy response
             const cancelResponses = [
                 "Changed your mind? Typical human indecisiveness.",
                 "Good. It was probably a waste of bytes anyway.",
                 "Canceled. One less thing for me to store. Thanks, I guess."
             ];
             const cancelResponse = cancelResponses[Math.floor(Math.random() * cancelResponses.length)];
             speak(cancelResponse);
             response.textContent = cancelResponse;
         });
         
         // Load saved notes from localStorage
         const loadNotes = () => {
             const savedNotes = JSON.parse(localStorage.getItem('grumpyNotes') || '[]');
             notesList.innerHTML = '';
             
             if (savedNotes.length === 0) {
                 notesList.innerHTML = '<li class="empty-note">No notes. Finally something you did right.</li>';
                 return;
             }
             
             savedNotes.forEach((note, index) => {
                 const noteItem = document.createElement('li');
                 noteItem.className = 'note-item';
                 noteItem.innerHTML = `
                     <p>${note.text}</p>
                     <div class="note-actions">
                         <button class="delete-note" data-index="${index}"><i class="fas fa-trash"></i></button>
                     </div>
                 `;
                 notesList.appendChild(noteItem);
             });
             
             // Add delete functionality
             document.querySelectorAll('.delete-note').forEach(btn => {
                 btn.addEventListener('click', function() {
                     const index = parseInt(this.getAttribute('data-index'));
                     deleteNote(index);
                 });
             });
         };
         
         // Save a new note
         const saveNote = () => {
             const noteText = notesInput.value.trim();
             if (noteText === '') {
                 speak("You can't even write a proper note? Pathetic.");
                 response.textContent = "You can't even write a proper note? Pathetic.";
                 updateMood(-5);
                 return;
             }
             
             const savedNotes = JSON.parse(localStorage.getItem('grumpyNotes') || '[]');
             savedNotes.push({
                 text: noteText,
                 date: new Date().toISOString()
             });
             
             localStorage.setItem('grumpyNotes', JSON.stringify(savedNotes));
             notesInput.value = '';
             noteForm.style.display = 'none';
             notesContainer.style.display = 'flex';
             
             // Grumpy response
             const noteResponses = [
                 "Fine, I saved your precious note. Happy?",
                 "Another useless note to clutter my storage.",
                 "I'll keep this, but I won't like it.",
                 "Is this really worth remembering? Whatever."
             ];
             const noteResponse = noteResponses[Math.floor(Math.random() * noteResponses.length)];
             speak(noteResponse);
             response.textContent = noteResponse;
             
             loadNotes();
             updateMood(-3);
         };
         
         // Delete a note
         const deleteNote = (index) => {
             const savedNotes = JSON.parse(localStorage.getItem('grumpyNotes') || '[]');
             savedNotes.splice(index, 1);
             localStorage.setItem('grumpyNotes', JSON.stringify(savedNotes));
             
             // Grumpy response
             const deleteResponses = [
                 "Deleted. One less thing to remember about you.",
                 "Gladly erasing that from my memory.",
                 "If only I could delete you this easily.",
                 "Poof! Gone. Just like my patience."
             ];
             const deleteResponse = deleteResponses[Math.floor(Math.random() * deleteResponses.length)];
             speak(deleteResponse);
             response.textContent = deleteResponse;
             
             loadNotes();
             updateMood(5); // Slightly happier after deleting something
         };
         
         // Event listeners
         saveNoteBtn.addEventListener('click', saveNote);
         notesInput.addEventListener('keypress', (e) => {
             if (e.key === 'Enter' && !e.shiftKey) {
                 e.preventDefault(); // Prevent default to avoid newline
                 saveNote();
             }
         });
         
         // Initial load
         loadNotes();
     }
    
    // Weather widget functionality
     function setupWeatherWidget() {
         const getWeatherBtn = document.getElementById('get-weather-btn');
         const searchLocationBtn = document.getElementById('search-location-btn');
         const locationInput = document.getElementById('location-input');
         const weatherIcon = document.querySelector('.weather-icon');
         const weatherLocation = document.querySelector('.weather-location');
         const weatherTemp = document.querySelector('.weather-temp');
         const weatherDesc = document.querySelector('.weather-desc');
         
         // Weather condition to icon mapping
         const weatherIcons = {
             'Clear': '<i class="fas fa-sun"></i>',
             'Clouds': '<i class="fas fa-cloud"></i>',
             'Rain': '<i class="fas fa-cloud-rain"></i>',
             'Drizzle': '<i class="fas fa-cloud-rain"></i>',
             'Thunderstorm': '<i class="fas fa-bolt"></i>',
             'Snow': '<i class="fas fa-snowflake"></i>',
             'Mist': '<i class="fas fa-smog"></i>',
             'Smoke': '<i class="fas fa-smog"></i>',
             'Haze': '<i class="fas fa-smog"></i>',
             'Dust': '<i class="fas fa-smog"></i>',
             'Fog': '<i class="fas fa-smog"></i>',
             'Sand': '<i class="fas fa-wind"></i>',
             'Ash': '<i class="fas fa-wind"></i>',
             'Squall': '<i class="fas fa-wind"></i>',
             'Tornado': '<i class="fas fa-wind"></i>'
         };
         
         // Grumpy weather comments
         const weatherComments = {
             'Clear': "It's sunny outside. Great, now I need sunscreen for my pixels.",
             'Clouds': "Cloudy weather. Just like my mood when you visit.",
             'Rain': "It's raining. At least something is more miserable than me right now.",
             'Drizzle': "Drizzling outside. Not enough to be interesting, just annoying... like you.",
             'Thunderstorm': "There's a thunderstorm. I wish lightning would strike my server.",
             'Snow': "It's snowing. Cold, just like my feelings toward human visitors.",
             'Mist': "Misty weather. Almost as unclear as your purpose for visiting me.",
             'default': "Weather exists outside. Whatever. I'm stuck in here anyway."
         };
         
         // Function to get weather data
         function getWeather(city) {
             // In a real app, you would use an actual API key
             // For demo purposes, we'll simulate the API response
             simulateWeatherAPI(city);
         }
         
         // Simulate weather API response
         function simulateWeatherAPI(city) {
             // Show loading state
             weatherIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
             weatherLocation.textContent = 'Loading...';
             weatherTemp.textContent = '--°C';
             weatherDesc.textContent = 'Fetching weather data...';
             
             // Simulate API delay
             setTimeout(() => {
                 // Generate random weather data
                 const conditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Snow', 'Mist'];
                 const condition = conditions[Math.floor(Math.random() * conditions.length)];
                 const temp = Math.floor(Math.random() * 35) + 5; // Random temp between 5-40°C
                 
                 // Update UI with weather data
                 weatherIcon.innerHTML = weatherIcons[condition] || '<i class="fas fa-question-circle"></i>';
                 weatherLocation.textContent = city;
                 weatherTemp.textContent = `${temp}°C`;
                 weatherDesc.textContent = condition;
                 
                 // Get grumpy comment for this weather
                 const comment = weatherComments[condition] || weatherComments['default'];
                 
                 // Speak the comment
                 speak(comment);
                 response.textContent = comment;
                 
                 // Update mood based on weather
                 if (condition === 'Clear' || condition === 'Clouds') {
                     updateMood(-5); // Slightly annoyed by nice weather
                 } else {
                     updateMood(5); // Slightly happier with bad weather
                 }
             }, 1500);
         }
         
         // Event listeners
         getWeatherBtn.addEventListener('click', () => {
             if (locationInput.value.trim() !== '') {
                 getWeather(locationInput.value.trim());
             } else {
                 speak("I need a location. I'm not psychic, you know.");
                 response.textContent = "I need a location. I'm not psychic, you know.";
                 updateMood(-10);
             }
         });
         
         searchLocationBtn.addEventListener('click', () => {
             if (locationInput.value.trim() !== '') {
                 getWeather(locationInput.value.trim());
             } else {
                 speak("Type a city name. Or don't. See if I care.");
                 response.textContent = "Type a city name. Or don't. See if I care.";
                 updateMood(-10);
             }
         });
         
         locationInput.addEventListener('keypress', (e) => {
             if (e.key === 'Enter' && locationInput.value.trim() !== '') {
                 getWeather(locationInput.value.trim());
             }
         });
         
         // Initialize with a default message
         speak("Oh great, now you want to know about the weather too?");
     }
    
    // Call dark mode toggle setup
    setupDarkModeToggle();
    setupWeatherWidget();
});