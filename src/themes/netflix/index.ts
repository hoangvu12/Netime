const controls = () => `
<div class="plyr__controls">
    <div class="plyr__controls-position plyr__controls-position--left">
        <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
            <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
            <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
            <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
            <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
        </button>
        <button type="button" class="plyr__control" data-plyr="rewind">
            <svg viewBox="0 0 22 22"><g id="back-10"><path fill="currentColor" d="M12.4521632,5.01256342 L13.8137335,6.91876181 L12.1862665,8.08123819 L9.27109639,4 L12.1862665,-0.0812381937 L13.8137335,1.08123819 L12.4365066,3.0093558 C17.7568368,3.23786247 22,7.6234093 22,13 C22,18.5228475 17.5228475,23 12,23 C6.4771525,23 2,18.5228475 2,13 C2,11.0297737 2.57187523,9.14190637 3.62872363,7.52804389 L5.30188812,8.6237266 C4.4566948,9.91438076 4,11.4220159 4,13 C4,17.418278 7.581722,21 12,21 C16.418278,21 20,17.418278 20,13 C20,8.73346691 16.6600802,5.24701388 12.4521632,5.01256342 Z M8.47,17 L8.47,11.41 L6.81,11.92 L6.81,10.75 L9.79,9.91 L9.79,17 L8.47,17 Z M14.31,17.15 C13.7499972,17.15 13.2600021,17.0016682 12.84,16.705 C12.4199979,16.4083319 12.0950011,15.9883361 11.865,15.445 C11.6349988,14.901664 11.52,14.2600037 11.52,13.52 C11.52,12.786663 11.6349988,12.1466694 11.865,11.6 C12.0950011,11.0533306 12.4199979,10.6316682 12.84,10.335 C13.2600021,10.0383319 13.7499972,9.89 14.31,9.89 C14.8700028,9.89 15.3599979,10.0383319 15.78,10.335 C16.2000021,10.6316682 16.5249988,11.0533306 16.755,11.6 C16.9850012,12.1466694 17.1,12.786663 17.1,13.52 C17.1,14.2600037 16.9850012,14.901664 16.755,15.445 C16.5249988,15.9883361 16.2000021,16.4083319 15.78,16.705 C15.3599979,17.0016682 14.8700028,17.15 14.31,17.15 Z M14.31,15.97 C14.7500022,15.97 15.1016653,15.7533355 15.365,15.32 C15.6283346,14.8866645 15.76,14.2866705 15.76,13.52 C15.76,12.7533295 15.6283346,12.1533355 15.365,11.72 C15.1016653,11.2866645 14.7500022,11.07 14.31,11.07 C13.8699978,11.07 13.5183346,11.2866645 13.255,11.72 C12.9916653,12.1533355 12.86,12.7533295 12.86,13.52 C12.86,14.2866705 12.9916653,14.8866645 13.255,15.32 C13.5183346,15.7533355 13.8699978,15.97 14.31,15.97 Z M7.72890361,4 L9.81373347,6.91876181 L8.18626653,8.08123819 L5.27109639,4 L8.18626653,-0.0812381937 L9.81373347,1.08123819 L7.72890361,4 Z"></path></g></svg>
            <span class="plyr__tooltip" role="tooltip">Rewind {seektime} secs</span>
        </button>
        <button type="button" class="plyr__control" data-plyr="fast-forward">
            <svg viewBox="0 0 22 22"><g id="forward-10"><path fill="currentColor" d="M11.8291288,3.00143042 L10.4575629,1.08123819 L12.0850299,-0.0812381937 L15.0002,4 L12.0850299,8.08123819 L10.4575629,6.91876181 L11.8267943,5.0018379 C7.48849327,5.09398699 4,8.63960287 4,13 C4,17.418278 7.581722,21 12,21 C16.418278,21 20,17.418278 20,13 C20,11.4220159 19.5433052,9.91438076 18.6981119,8.6237266 L20.3712764,7.52804389 C21.4281248,9.14190637 22,11.0297737 22,13 C22,18.5228475 17.5228475,23 12,23 C6.4771525,23 2,18.5228475 2,13 C2,7.53422249 6.38510184,3.09264039 11.8291288,3.00143042 Z M8.56,17 L8.56,11.41 L6.9,11.92 L6.9,10.75 L9.88,9.91 L9.88,17 L8.56,17 Z M14.4,17.15 C13.8399972,17.15 13.3500021,17.0016682 12.93,16.705 C12.5099979,16.4083318 12.1850012,15.988336 11.955,15.445 C11.7249989,14.9016639 11.61,14.2600037 11.61,13.52 C11.61,12.786663 11.7249989,12.1466694 11.955,11.6 C12.1850012,11.0533306 12.5099979,10.6316681 12.93,10.335 C13.3500021,10.0383318 13.8399972,9.89 14.4,9.89 C14.9600028,9.89 15.4499979,10.0383318 15.87,10.335 C16.2900021,10.6316681 16.6149988,11.0533306 16.845,11.6 C17.0750012,12.1466694 17.19,12.786663 17.19,13.52 C17.19,14.2600037 17.0750012,14.9016639 16.845,15.445 C16.6149988,15.988336 16.2900021,16.4083318 15.87,16.705 C15.4499979,17.0016682 14.9600028,17.15 14.4,17.15 Z M14.4,15.97 C14.8400022,15.97 15.1916654,15.7533355 15.455,15.32 C15.7183347,14.8866645 15.85,14.2866705 15.85,13.52 C15.85,12.7533295 15.7183347,12.1533355 15.455,11.72 C15.1916654,11.2866645 14.8400022,11.07 14.4,11.07 C13.9599978,11.07 13.6083346,11.2866645 13.345,11.72 C13.0816654,12.1533355 12.95,12.7533295 12.95,13.52 C12.95,14.2866705 13.0816654,14.8866645 13.345,15.32 C13.6083346,15.7533355 13.9599978,15.97 14.4,15.97 Z M14.4575629,6.91876181 L16.5423928,4 L14.4575629,1.08123819 L16.0850299,-0.0812381937 L19.0002,4 L16.0850299,8.08123819 L14.4575629,6.91876181 Z"></path></g></svg>
            <span class="plyr__tooltip" role="tooltip">Forward {seektime} secs</span>
        </button>
    </div>

    <div class="plyr__controls-position plyr__controls-position--center">
        <h1 class="text-white font-medium text-base line-clamp-1">
            {title}
        </h1>
    </div>

    <div class="plyr__controls-position plyr__controls-position--right">
        <div class="plyr__controls--audio">
            <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
                <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
                <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
                <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
                <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
            </button>    
            <div class="plyr__volume">
                <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
            </div>
        </div>
        <button type="button" class="plyr__control" data-plyr="fullscreen">
            <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
            <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
            <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
            <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
        </button>
    </div>

    <div class="plyr__controls-position plyr__controls-position--top">
        <div class="plyr__controls-position--top_relative">
            <div class="plyr__progress">
                <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
                <span role="tooltip" class="plyr__tooltip">00:00</span>
            </div>
            <div class="plyr__time-container">
                <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
                <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
            </div>
        </div>
    </div>
</div>
`;

export default controls;
