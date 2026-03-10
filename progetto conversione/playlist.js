
    //render player series items
    let html_modal_player_items = `<div class="modal-player__season-select">
        <select class="select" data-season-select><option>season 1</option>
        </select>
    </div>`;
    const player_data = player_data_source.map((data) => {
        html_modal_player_items += render_players_items_template(data)
    })

    document.querySelector('.modal-player__items').innerHTML = html_modal_player_items;

    function render_players_items_template(player_data) {
        const { season_id, series_id, series_url, series_title } = player_data;
        let type = '';
        const str = new String(series_url);
        if (!str.endsWith(".mp4")) {
            type = 'type="application/x-mpegURL"';
        }
        const playlist_items_template = `<div class="modal-player__item" data-season-index="${season_id}" data-series-index="${series_id}" data-series-title="${series_title}">
                <video class="video-js vjs-default-skin vjs-big-play-centered modal-player__item-video" controls>
                    <source src="${series_url}" ${type}>
                </video>
            </div>`;
        return playlist_items_template;
    }

    //render playlist on Landing
    let html_playlist_landing = "";
    let html_playlist_select = "";
    let html_modal_playlist = "";
    const playlist_landing = playlist_data_source.map((season, key) => {
        html_playlist_landing += render_playlist_items_template(season, key)
        html_modal_playlist += render_modal_playlist_items_template(season, key)
        html_playlist_select += render_playlist_select(season, key)
    })

    document.querySelector('.playlist__items').innerHTML = html_playlist_landing;
    document.querySelector('.modal-player__playlist-content').innerHTML = html_modal_playlist;
    document.querySelector('.playlist__dropdown select').innerHTML = html_playlist_select;
    document.querySelector('.modal-player__season-select select').innerHTML = html_playlist_select;

    function render_playlist_select(playlist_data, key){
        const { season_id, season_name, season_videos } = playlist_data;
        const select_option = `<option value="${season_id}">Season ${key+1}</option>`;
        return select_option;
    }

    function render_playlist_items_template(playlist_data, key) {
        const { season_id, season_name, season_videos } = playlist_data;
        const playlist_series_list = season_videos.map((series, index) => render_series_template(index, { season_id, ...series }))
        const active_class = key === 0 ? 'playlist__item--active' : '';
        const playlist_items_template = `<div class="playlist__item ${active_class}" data-season-index="${key}">${playlist_series_list.join("")}</div>`;
        return playlist_items_template;
    }
    function render_series_template(index, series_data) {
        const { season_id, video_id, video_name, video_description, video_duration, video_poster, video_url } = series_data;
        const series_template = `<div class="playlist__series">
            <div class="playlist__series-number">${index + 1}</div>
            <div class="playlist__series-preview thumbnail" data-season-index="${season_id}"
                    data-series-index="${video_id}">
                <div class="playlist__series-preview-item">

                    <video class="playlist__series-preview-item-video thumbnail__video" muted
                            playsinline>
                        <source src="${video_url}">
                    </video>

                    <img class="playlist__series-preview-item-img thumbnail__img"
                            src="${video_poster}">
                            <span class="playlist__series-preview-item-time thumbnail__time">--:--</span>
                    <progress id='top-progress-bar' class='top-progress-bar' min='0' max='100' value='0'>0%
                                    played</progress>
                </div>
            </div>
            <div class="playlist__series-title">${video_name}</div>
            <div class="playlist__series-description">${video_description}</div>
        </div>`;
        return series_template;
    }

    //render modal playlist template
    function render_modal_playlist_items_template(playlist_data, key) {
            const { season_id, season_name, season_videos } = playlist_data;
            const modal_playlist_series_list = season_videos.map((series, index) => render_modal_series_template(index, { season_id, ...series }))
            const active_class = key === 0 ? 'modal-player__playlist-item--active' : '';
            const playlist_items_template = `<div class="modal-player__playlist-item ${active_class}" data-season-index="${season_id}">${modal_playlist_series_list.join("")}</div>`;
            return playlist_items_template;
    }
    function render_modal_series_template(index, series_data) {
        const { season_id, video_id, video_name, video_description, video_duration, video_poster, video_url } = series_data;
        const series_template = `<div class="modal-player__series" data-season-index="${season_id}" data-series-index="${video_id}" data-series-number="${index+1}">
                <div class="modal-player__series-preview thumbnail" data-season-index="${season_id}" data-series-index="${video_id}">
                    <div class="modal-player__series-preview-item">

                        <video class="modal-player__series-preview-item-video thumbnail__video" muted
                                playsinline>
                            <source src="${video_url}">
                        </video>
                        <span class="modal-player__series-time thumbnail__time">--:--</span>
                        <progress id='top-progress-bar' class='top-progress-bar' min='0' max='100' value='0'>0% played</progress>
                        <img class="modal-player__series-item-img thumbnail__img"
                                src="${video_poster}">
                    </div>
                </div>
                <div class="modal-player__series-title">${video_name}</div>
                <div class="modal-player__series-description">${video_description}</div>
            </div>`;
        return series_template;
    }

    function setQualityLevels(player) {
        //quality videojs     
        let cog = player.el().querySelector('button.vjs-setting-button')
        var qualityLevels = player.qualityLevels();
        let badge = document.createElement('span')

        badge.classList.add('badge')
        cog.appendChild(badge)

        // check quality -----------------------------------------------------------
        qualityLevels.on('change', function () {
            if (qualityLevels.selectedIndex_ >= 2 && qualityLevels.selectedIndex_ <= 3) {
                badge.style.display = 'flex'
                badge.innerText = 'SD'
                badge.style.width = '1rem'
            }
            else if (qualityLevels.selectedIndex_ >= 4 && qualityLevels.selectedIndex_ <= 6) {
                badge.style.display = 'flex'
                badge.innerText = 'HD'
                badge.style.width = '1rem'
            }
            else if (qualityLevels.selectedIndex_ >= 6 && qualityLevels.selectedIndex_ <= 8) {
                badge.style.display = 'flex'
                badge.innerText = '2k'
                badge.style.width = '1rem'
            }
            else if (qualityLevels.selectedIndex_ >= 9) {
                badge.style.display = 'flex'
                badge.style.background = ' #ff0000'
                badge.style.color = '#ffffff'
                badge.style.font = '15px'
                badge.innerText = '4K'
                badge.style.width = '1rem'
            }
            else {
                badge.style.display = 'none'
            }
        });
    }

    const mobileBreakpoint = 1023;

    const $playlist = document.querySelector('.playlist');
    const playlistOpenModal = 'playlist--open-modal';
    const $modal = document.querySelector('.modal-player');
    const modalActiveClass = 'modal-player--active';
    const $modalClose = document.querySelector('.modal-player__close');
    const $playlistClose = document.querySelector('.modal-player__back');


    const openPlaylistClass = 'modal-player--open-playlist';
    const videoThumbnails = Array.from(document.querySelectorAll('.thumbnail'));
    const selects = Array.from(document.querySelectorAll('.select'));
    const mainSeasonWrappers = Array.from(document.querySelectorAll('.playlist__item'));
    const modalSeasonWrappers = Array.from(document.querySelectorAll('.modal-player__playlist-item'));
    const mainSeasonWrapperActiveClass = 'playlist__item--active';
    const modalSeasonWrapperActiveClass = 'modal-player__playlist-item--active';

    const videoItemClass = 'modal-player__item';
    const videoItemActiveClass = 'modal-player__item--active';
    const videoItems = Array.from(document.querySelectorAll(`.${videoItemClass}`));
    const $titleSeasonNumber = document.querySelector('.playlist__title-number');
    const $nextButton = document.querySelector('.modal-player__playlist-footer-next-button');
    const nextButtonDisabledClass = 'modal-player__playlist-footer-next-button--disabled';
    const $nextText = document.querySelector('.modal-player__playlist-footer-next-text');

    const players = Array.from(document.querySelectorAll('.video-js'));
    const loopButtonClass = 'loop-button';
    const loopButtonActiveClass = 'loop-button--active';
    const togglePlaylistButtonClass = 'toggle-playlist';
    const togglePlaylistButtonActiveClass = 'toggle-playlist--active';
    const nextSessonButtonClass = 'next-playlist';
    const nextSessonButtonDisabledClass = 'next-playlist--disabled';

    const playlistSeriesClass = 'modal-player__series';
    const playlistSeriesPlayingClass = 'modal-player__series--playing';
    const playlistSeries = Array.from(document.querySelectorAll(`.${playlistSeriesClass}`));

    let thumbnailFrame = 10;


    var canFullscreen = function () {
        return (
            !document.fullscreen &&
            !document.mozFullScreen &&
            !document.webkitFullscreen &&
            !document.msFullscreen);
    }

    //playlist in fullscreen
    var Component = videojs.getComponent('Component');

    // The videojs.extend function can be used instead of ES6 classes.
    var PlayListFullscreen = videojs.extend(Component, {
        constructor: function (player, options) {

            // Equivalent of `super(this, arguments)`
            Component.apply(this, arguments);
            this.el().innerHTML = '<div class="modal-player__playlist">' + document.querySelector('.modal-player__playlist').innerHTML + "</div>";
            
        },

        createEl: function () {
            return videojs.dom.createEl('div', {
                className: 'vjs-playlist'
            });
        },
    });

    var selectSeasonFullscreen = videojs.extend(Component, {
        constructor: function (player, options) {

            // Equivalent of `super(this, arguments)`
            Component.apply(this, arguments);
            this.el().innerHTML +=  document.querySelector('.modal-player__season-select').innerHTML;

        },

        createEl: function () {
            return videojs.dom.createEl('div', {
                className: 'vjs-player__season-select'
            });
        },
    });

    const Button = videojs.getComponent('Button');

    let currentSeason = 0;
    let currentSeries = 0;
    let loopState = false;

    const loopButton = videojs.extend(Button, {
        constructor: function () {
            Button.apply(this, arguments);
            this.addClass(loopButtonClass);
        },
        handleClick: function () {
            const videoContent = this.player().el().querySelector('video');
            const $loopButton = this.player().el().querySelector(`.${loopButtonClass}`);

            if ($loopButton.classList.contains(loopButtonActiveClass)) {
                $loopButton.classList.remove(loopButtonActiveClass);
                loopState = false;
            } else {
                $loopButton.classList.add(loopButtonActiveClass);
                loopState = true;
            }
        }
    });

    const togglePlaylistButton = videojs.extend(Button, {
        constructor: function () {
            Button.apply(this, arguments);
            this.addClass(togglePlaylistButtonClass);
        },
        handleClick: function () {
            this.player().el().querySelector('.vjs-playlist').innerHTML = "<div class='modal-player__playlist'>" + document.querySelector('.modal-player > .modal-player__playlist').innerHTML + "</div>";
            const $togglePlaylistButton = this.player().el().querySelector(`.${togglePlaylistButtonClass}`);
            const $fullscreenPlaylist = this.player().el().querySelector('.vjs-playlist');

            if ($modal.classList.contains(openPlaylistClass)) {
                $togglePlaylistButton.classList.remove(togglePlaylistButtonActiveClass);
                $modal.classList.remove(openPlaylistClass);
                document.querySelector('.vjs-player__season-select').classList.add('toRight')
            } else {
                $togglePlaylistButton.classList.add(togglePlaylistButtonActiveClass);
                $modal.classList.add(openPlaylistClass);
                document.querySelector('.vjs-player__season-select').classList.remove('toRight')
            }


            if($fullscreenPlaylist.classList.contains('open')){
                $fullscreenPlaylist.classList.remove('open')
            }else{
                $fullscreenPlaylist.classList.add('open')
            }
        }
    });

    const nextSessonButton = videojs.extend(Button, {
        constructor: function () {
            Button.apply(this, arguments);
            this.addClass(nextSessonButtonClass);
            //document.querySelector('.vjs-remaining-time').remove();
        },
        handleClick: function () {
            playNext();
        }
    });

    const closeButton = videojs.extend(Button, {
        constructor: function () {
            Button.apply(this, arguments);
            this.addClass('close');
            this.innerHTML = "&times;"
            //document.querySelector('.vjs-remaining-time').remove();
        },
        handleClick: function () {
            videojs.log('Clicked');
        }
    });

    const changeSeasonButton = videojs.extend(Button, {
        constructor: function () {
            Button.apply(this, arguments);
            this.addClass('change-season');
        },
        handleClick: function () {
            const classes = this.player().el().querySelector('.vjs-player__season-select').classList;
            if (classes.contains('active')) {
                classes.remove('active');
            } else {
                classes.add('active');
            }
        }
    });

        
    videojs.registerComponent('PlayListFullscreen', PlayListFullscreen);
    videojs.registerComponent('selectSeasonFullscreen', selectSeasonFullscreen);
    videojs.registerComponent('loopButton', loopButton);
    videojs.registerComponent('togglePlaylistButton', togglePlaylistButton);
    videojs.registerComponent('nextSessonButton', nextSessonButton);
    videojs.registerComponent('closeButton', closeButton);
    videojs.registerComponent('changeSeasonButton', changeSeasonButton);
    players.forEach(($player, index) => {
        const video_title = $player.parentElement.dataset.seriesTitle;
        const player = videojs($player, {
            title: video_title !== "undefined" ? video_title : "",
            controlBar: {
                pictureInPictureToggle: false
            }
        });
        if (player.currentType() === 'application/x-mpegURL') {
            var flor = window.flor = player.flor();
            setQualityLevels(player);
        }
        player.seekButtons({
            forward: 30,
            back: 10
        })
        player.addChild('PlayListFullscreen');
        player.addChild('selectSeasonFullscreen');
        player.getChild('controlBar').addChild('loopButton', {}, 9);
        player.getChild('controlBar').addChild('togglePlaylistButton', {}, 9);
        player.getChild('controlBar').addChild('changeSeasonButton', {}, 9);
        player.getChild('controlBar').addChild('nextSessonButton', {}, 1);
        const closeBtn = player.addChild('closeButton');

        player.on('play', () => {
            player.on('userinactive', () => {
                const selectClasses = player.el().querySelector('.vjs-player__season-select').classList;
                if(!selectClasses.contains('mouseOn')){
                    selectClasses.remove('active')
                }
                
            })
        })
        player.on('pause', () => {
            player.off('userinactive')
        })

        closeBtn.el().addEventListener('click', () => {
            player.pause()
            $modal.classList.remove(modalActiveClass);
            $playlist.classList.remove(playlistOpenModal);
            if (canFullscreen() === false) {
                document.exitFullscreen()
            }
        })


        player.on('play', () => {
            setPlayingClass(+$player.closest(`.${videoItemClass}`).dataset.seasonIndex, +$player.closest(`.${videoItemClass}`).dataset.seriesIndex);
        });

        player.on('ready', () => {
            const $togglePlaylistButton = player.el().querySelector(`.${togglePlaylistButtonClass}`);

            if ($modal.classList.contains(openPlaylistClass)) {
                $togglePlaylistButton.classList.add(togglePlaylistButtonActiveClass);
            } else {
                $togglePlaylistButton.classList.remove(togglePlaylistButtonActiveClass);
            }

            const $seasonSelect = player.el().querySelector('.vjs-player__season-select select');
            const select = new Select({
                $select: $seasonSelect,
            });

            $seasonSelect.addEventListener('change', () => {
                if (+$seasonSelect.value !== currentSeason) {
                    changeSeason(+$seasonSelect.value);
                }
            });

            player.el().querySelector('.vjs-player__season-select').addEventListener('mouseover', () => {
                select.checkPosition();
            });

        });

        player.on('ended', () => {
            if (loopState) {
                playNext();
            }
        });
        player.ready(function () {
            this.persistvolume();
        });
    });


    class Select {

        /* Example options
        {
            selectClass:'select',     // String
            $select:document.getElementsByClassName(this.selectClass)[0],       // node element
            customSelectClass:'custom-select',     // String
        }
         */

        constructor(options) {
            this.selectClass = options && options.selectClass ?
                options.selectClass :
                'select';
            this.$select = options && options.$select ?
                options.$select :
                document.getElementsByClassName(this.selectClass)[0];
            this.customSelectClass = options && options.customSelectClass ?
                options.customSelectClass :
                'custom-select';
            this.openClass = options && options.openClass ?
                options.openClass :
                this.customSelectClass + '--open';
            this.selectedClass = options && options.selectedClass ?
                options.selectedClass :
                this.customSelectClass + '--selected';
            this.itemClass = options && options.itemClass ?
                options.itemClass :
                this.customSelectClass + '__item';
            this.selectedItemClass = options && options.selectedItemClass ?
                options.selectedItemClass :
                this.itemClass + '--selected';
            this.disabledItemClass = options && options.disabledItemClass ?
                options.disabledItemClass :
                this.itemClass + '--disabled';
            this.invertPositionClass = options && options.invertPositionClass ?
                options.invertPositionClass :
                this.customSelectClass + '--invert';
            this.$customSelect = document.createElement('div');
            this.current = null;
            this.options = Array.from(this.$select.getElementsByTagName('option'));
            this.changeEvent = new Event('change', {bubbles: true});
            this.data = this.getSelectData();
            this.init();
        }

        init() {
            this.$select.parentElement.appendChild(this.$customSelect).tabIndex = 0;
            this.$customSelect.classList.add(this.customSelectClass);
            this.$customSelect.appendChild(this.$select);
            this.setHtml();
            this.setKeyboardManage();
        }

        getSelectData() {
            this.options = Array.from(this.$select.getElementsByTagName('option'));
            let optionsArray = new Map();

            this.options.map((item, index) => {
                let value = item.hasAttribute('value') ?
                    item.getAttribute('value') :
                    item.innerText;

                let selected = false;

                if (item.hasAttribute('selected')) {
                    this.current = index;
                    selected = true;
                }

                const option = {
                    name: item.innerText,
                    selected: item.hasAttribute('selected'),
                    disabled: item.hasAttribute('disabled'),
                    hidden: item.hasAttribute('hidden'),
                    index: index
                };

                optionsArray.set('index' + option.index, option);
            });

            if (this.current === null) {
                this.current = optionsArray.get('index' + 0).index;
            }
            return optionsArray;
        }

        setHtml() {
            const template = `
            <div data-select-type="button" class="${this.customSelectClass}__input">
                <div data-select-type="button" class="${this.customSelectClass}__input-name">${this.data.get('index' + this.current).name}</div>
                <div data-select-type="button" class="${this.customSelectClass}__input-icon"></div>
            </div>
            <div data-select-type="button" class="${this.customSelectClass}__list custom-scroll"></div>
        `;

            this.$customSelect.insertAdjacentHTML('beforeEnd', template);

            this.setListHtml();
            this.setup();
            this.checkPosition();
        }

        setListHtml() {
            let $list = this.$customSelect.querySelector(`.${this.customSelectClass}__list`);
            let list = '';

            for (let item of this.data.values()) {
                if (!item.hidden) {
                    let classDisabled = '';
                    let classSelected = '';

                    if (item.selected) {
                        classSelected = this.selectedItemClass;
                    }

                    if (item.disabled) {
                        classDisabled = this.disabledItemClass;
                    }

                    list += `<div data-select-index="${item.index}" tabindex="0" data-select-type="value" class="${this.customSelectClass}__item ${classSelected} ${classDisabled}">${item.name}</div>`;
                }
            }

            $list.innerHTML = '';
            $list.insertAdjacentHTML('beforeEnd', list);
        }

        setup() {
            this.clickHandler = this.clickHandler.bind(this);
            this.changeHandler = this.changeHandler.bind(this);
            document.addEventListener('click', this.clickHandler);
            window.addEventListener('scroll', this.checkPosition);
            this.$select.addEventListener('change', this.changeHandler);
            if(document.querySelectorAll('.custom-select__list')[1]){
                document.querySelectorAll('.custom-select__list')[1].addEventListener('mouseover', () => {
                    document.querySelector('.vjs-player__season-select').classList.add('mouseOn')
                });
                 document.querySelectorAll('.custom-select__list')[1].addEventListener('mouseout', () => {
                    document.querySelector('.vjs-player__season-select').classList.remove('mouseOn')
                });
            }
            this.$name = this.$customSelect.querySelector('.' + this.customSelectClass + '__input-name');
            this.$items = this.$customSelect.querySelectorAll('.' + this.customSelectClass + '__item');
        }

        checkPosition() {

            if (!this.$customSelect) {
                return;
            }

            const top = this.$customSelect.getBoundingClientRect().top;
            const freePlace = window.innerHeight - this.$customSelect.getBoundingClientRect().height - 250;

            if (top > freePlace) {
                this.$customSelect.classList.add(this.invertPositionClass);
            } else {
                this.$customSelect.classList.remove(this.invertPositionClass);
            }
        }

        clickHandler(event) {
            const isSelectClick = (click) => {
                if (click === this.$customSelect) {
                    return true;
                } else if (click.closest('.' + this.customSelectClass) && click.closest('.' + this.customSelectClass) === this.$customSelect) {
                    return true;
                } else {
                    return false;
                }
            };

            if (isSelectClick(event.target)) {
                const type = event.target.dataset.selectType;
                if (type === 'button') {
                    this.toggle();
                } else if (type === 'value') {
                    if (!event.target.classList.contains(this.disabledItemClass)) {
                        this.current = event.target.dataset.selectIndex;
                        this.select(this.current);
                        this.close();
                        document.querySelector('.vjs-player__season-select').classList.remove('active');
                    }
                }
            } else {
                this.close();
            }
        }

        changeHandler(event) {
            this.options = Array.from(this.$select.getElementsByTagName('option'));

            this.options.map((item, index) => {
                let value;

                if (item.hasAttribute('value')) {
                    value = item.getAttribute('value');
                } else {
                    value = item.innerText;
                }

                if (value === this.$select.value) {
                    this.setSelectHtml(index);
                }
            });

            if (this.$select.value === 'default') {
                this.$customSelect.classList.remove(this.selectedClass);
            } else {
                this.$customSelect.classList.add(this.selectedClass);
            }
        }

        select(index) {
            this.current = index;
            this.$select.value = this.options[index].value;
            this.$select.dispatchEvent(this.changeEvent);
        }

        setSelectHtml(index) {
            this.$name.innerText = this.data.get('index' + index).name;

            this.$items.forEach(($item) => {
                if (parseInt($item.dataset.selectIndex) === index && this.$select.value !== 'default') {
                    $item.classList.add(this.selectedItemClass);
                } else {
                    $item.classList.remove(this.selectedItemClass);
                }
            });

            if (this.$select.value === 'default') {
                this.$customSelect.classList.remove(this.selectedClass);
            } else {
                this.$customSelect.classList.add(this.selectedClass);
            }
        }

        refresh() {
            this.data = this.getSelectData();
            this.setListHtml();
            this.select(this.current);
        }

        toggle() {
            if (this.$customSelect.classList.contains(this.openClass)) {
                this.close();
            } else {
                this.open();
            }
        }

        open() {
            this.$customSelect.classList.add(this.openClass);
        }

        close() {
            this.$customSelect.classList.remove(this.openClass);
        }

        setKeyboardManage() {
            const down = 'ArrowDown';
            const up = 'ArrowUp';
            const space = 'Space';
            const enter = 'Enter';
            const escape = 'Escape';
            const specialKeys = [
                down,
                up,
                space,
                enter,
                escape,
            ];

            this.$customSelect.addEventListener('keydown', event => {
                const isOpen = this.$customSelect.classList.contains(this.openClass);

                if (specialKeys.indexOf(event.code) !== -1) {
                    event.preventDefault();
                    const $list = Array.from(this.$customSelect.querySelectorAll(`.${this.itemClass}`));

                    if (!isOpen && event.code === enter) {
                        return;
                    }

                    if (!isOpen) {
                        if (event.code === space) {
                            this.open();
                            return;
                        }

                        if (event.code === down || event.code === up) {
                            this.open();

                            if (event.code === down) {
                                $list[0].focus();
                            }

                            if (event.code === up) {
                                $list[$list.length - 1].focus();
                            }

                            return;
                        }

                        return;
                    }

                    if (isOpen) {
                        const currentIndex = $list.indexOf(document.activeElement);

                        if (event.code === escape) {
                            this.close();
                            this.$customSelect.focus();
                        }

                        if (event.code === down) {
                            const nextIndex = currentIndex + 1 === $list.length ?
                                0 :
                                currentIndex + 1;
                            $list[nextIndex].focus();
                        }

                        if (event.code === up) {
                            const nextIndex = currentIndex - 1 < 0 ?
                                $list.length - 1 :
                                currentIndex - 1;
                            $list[nextIndex].focus();
                        }

                        if (event.code === space || event.code === enter) {
                            if (document.activeElement.classList.contains(this.itemClass)) {
                                this.select(document.activeElement.dataset.selectIndex);
                                this.close();
                                this.$customSelect.focus();
                            }
                        }
                    }
                }

            });

        }
    }

    function playThumbnail($thumbnail) {
        const $video = $thumbnail.querySelector('.thumbnail__video');
        const $img = $thumbnail.querySelector('.thumbnail__img');

        const format = (s) =>  {
            var m = Math.floor(s / 60);
            m = (m >= 10) ? m : "0" + m;
            s = Math.floor(s % 60);
            s = (s >= 10) ? s : "0" + s;
            return m + ":" + s;
        }
        $video.onloadedmetadata = function () {
            const $time = $thumbnail.querySelector('.thumbnail__time').innerText = format($video.duration);
        };

        $thumbnail.addEventListener('mouseenter', () => {
            $video.play();
            $img.style.opacity = 0;
        });

        $thumbnail.addEventListener('mouseleave', () => {
            $video.pause();
            $video.currentTime = 0;
            $img.style.opacity = 1;
        });

    }

    function changeSeason(season) {
        currentSeason = season;
        currentSeries = 0;

        mainSeasonWrappers.forEach(($mainSeasonWrapper) => {
            if (+$mainSeasonWrapper.dataset.seasonIndex === currentSeason) {
                $mainSeasonWrapper.classList.add(mainSeasonWrapperActiveClass);
            } else {
                $mainSeasonWrapper.classList.remove(mainSeasonWrapperActiveClass);
            }
        });

        modalSeasonWrappers.forEach(($modalSeasonWrapper) => {
            if (+$modalSeasonWrapper.dataset.seasonIndex === currentSeason) {
                $modalSeasonWrapper.classList.add(modalSeasonWrapperActiveClass);
            } else {
                $modalSeasonWrapper.classList.remove(modalSeasonWrapperActiveClass);
            }
        });

        videoItems.forEach(($videoItem) => {
            $videoItem.querySelector('video').pause();
            //$videoItem.querySelector('video').currentTime = 0;

            if (+$videoItem.dataset.seasonIndex === currentSeason && +$videoItem.dataset.seriesIndex === 0) {
                $videoItem.classList.add(videoItemActiveClass);
            } else {
                $videoItem.classList.remove(videoItemActiveClass);
            }
        });

        selects.forEach(($select) => {
            $select.value = currentSeason;
            $select.dispatchEvent(new Event('change'));
        });

        $titleSeasonNumber.innerText = currentSeason + 1;

        setNextButton();
    }

    function calcNext() {
        let targetSeason = currentSeason;
        let isTargetSeason = false;
        let targetSeries = currentSeries + 1;
        let lastSeason = 0;

        videoItems.forEach(($videoItem) => {
            if (+$videoItem.dataset.seasonIndex > lastSeason) {
                lastSeason = +$videoItem.dataset.seasonIndex;
            }
        });

        videoItems.forEach(($videoItem) => {
            if (+$videoItem.dataset.seasonIndex === targetSeason && +$videoItem.dataset.seriesIndex === targetSeries) {
                isTargetSeason = true;
            }
        });


        if (isTargetSeason) {
            return {
                targetSeason,
                targetSeries
            };
        } else if (targetSeason + 1 > lastSeason) {
            return false;
        } else {
            return {
                targetSeason: targetSeason + 1,
                targetSeries: 0
            };
        }
    }

    function setNextButton() {
        let next = calcNext();
        $currentVideo = document.querySelector('.playlist__series__playing');

        if (next) {
            $nextButton.classList.remove(nextButtonDisabledClass);
            $nextButton.dataset.seasonIndex = next.targetSeason;
            $nextButton.dataset.seriesIndex = next.targetSeries;
            $nextText.innerText = `Season ${+$currentVideo.dataset.seasonIndex+1} Series ${+$currentVideo.dataset.seriesIndex+1}`;
        } else {
            $nextButton.classList.add(nextButtonDisabledClass);
            $nextText.innerText = `This is last series`;
        }
    }


    let cached_played_video = [];
    function playVideo(season, series) {
        if (!$modal.classList.contains(modalActiveClass)) {
            $modal.classList.add(modalActiveClass);
            $modal.dispatchEvent(new Event('open'));
        }

        if (window.innerWidth <= mobileBreakpoint) {
            $modal.classList.remove(openPlaylistClass);
        }

        currentSeason = season;
        currentSeries = series;

        videoItems.forEach(async ($videoItem) => {
            $videoItem.querySelector('video').pause();
            //$videoItem.querySelector('video').currentTime = 0;

            if (+$videoItem.dataset.seasonIndex === currentSeason && +$videoItem.dataset.seriesIndex === currentSeries) {
                document.querySelector('.vjs-fullscreen-control').addEventListener('click', () => {
                    document.querySelector('.close').style.display = 'block'
                })
                $videoItem.classList.add(videoItemActiveClass);
                $videoItem.querySelector('video').play();
                const videoId = $videoItem.querySelector('video').id;
                window.playPauseVideo($videoItem.querySelector('video'), currentSeason, currentSeries);
                if(cached_played_video.indexOf(videoId) > -1){
                    console.log('thumbnail already generated')
                    return;
                }else{
                    cached_played_video.push(videoId);
                }

                const vid = videojs($videoItem.querySelector('video').id);

                //check if LIVE HLS
                if(vid.duration() === Infinity){
                    return;
                }
                const generateThumbnails = async () => {
                    console.log(vid.duration()) // log is NaN 
                    if(vid.duration() === NaN){ generateThumbnails() }
                    //CHECK if HLS
                    if (vid.currentType() === 'application/x-mpegURL') {
                        let allThumb = [];
                        for (let i = 0; i < 3; i++) {
                            let seconds = 0;
                            let thumbnailsNumToGenerate = Math.round(vid.duration() / thumbnailFrame)
                            let items = [];
                            for (let i = 0; i < thumbnailsNumToGenerate; i++) {
                                items.push(getHlsVideoCover(vid.currentSrc(), seconds));
                                seconds += thumbnailFrame;
                            }
                            const results = await Promise.all(items).then(res => {
                                allThumb = Object.assign({}, ...res.map((x) => (x)));
                                vid.thumbnails(allThumb);
                            })
                            console.log({ ...allThumb })
                            if (Object.keys(allThumb).length > 5) {
                                break;
                            }
                        }
                        //vid.thumbnails(allThumb);
                        return;
                    } else {
                        let allThumb = [];
                        for (let i = 0; i < 3; i++) {
                            let seconds = 0;
                            let thumbnailsNumToGenerate = Math.round(vid.duration() / thumbnailFrame)
                            let items = [];
                            for (let i = 0; i < thumbnailsNumToGenerate; i++) {
                                items.push(getVideoCover(vid.currentSrc(), seconds));
                                seconds += thumbnailFrame;
                            }
                            const results = await Promise.all(items).then(res => {
                                allThumb = Object.assign({}, ...res.map((x) => (x)));
                                vid.thumbnails(allThumb);
                            })
                            console.log({ ...allThumb })
                            if (Object.keys(allThumb).length > 5) {
                                break;
                            }
                        }
                    }
                }
                generateThumbnails()
            } else {
                $videoItem.classList.remove(videoItemActiveClass);
            }
        });

        document.querySelectorAll('.playlist__series-preview').forEach(($playlistSeriesItem) => {
            const playlistSeriesSeason = +$playlistSeriesItem.dataset.seasonIndex;
            const playlistSeriesSeries = +$playlistSeriesItem.dataset.seriesIndex;

            if (playlistSeriesSeason === currentSeason && playlistSeriesSeries === currentSeries) {
                $playlistSeriesItem.classList.add('playlist__series__playing');
            } else {
                $playlistSeriesItem.classList.remove('playlist__series__playing');
            }
        });

        setNextButton();
    }

    function setPlayingClass(season, series) {
        playlistSeries.forEach(($playlistSeriesItem) => {
            const playlistSeriesSeason = +$playlistSeriesItem.dataset.seasonIndex;
            const playlistSeriesSeries = +$playlistSeriesItem.dataset.seriesIndex;

            if (playlistSeriesSeason === season && playlistSeriesSeries === series) {
                $playlistSeriesItem.classList.add(playlistSeriesPlayingClass);
            } else {
                $playlistSeriesItem.classList.remove(playlistSeriesPlayingClass);
            }
        });
    }

    function playNext() {
        if ($nextButton.classList.contains(nextButtonDisabledClass)) {
            return;
        }

        const targetSeason = +$nextButton.dataset.seasonIndex;
        const targetSeries = +$nextButton.dataset.seriesIndex;

        if (targetSeason !== currentSeason) {
            changeSeason(targetSeason);
        }

        playVideo(targetSeason, targetSeries);
    }

    videoThumbnails.forEach(($thumbnail) => {
        playThumbnail($thumbnail);

        $thumbnail.addEventListener('click', () => {
            document.querySelectorAll('.playlist__series-preview').forEach(($playlistSeriesItem) => {
                    $playlistSeriesItem.classList.remove('playlist__series__playing');
            });
            $thumbnail.classList.add('playlist__series__playing');
            playVideo(+$thumbnail.dataset.seasonIndex, +$thumbnail.dataset.seriesIndex);
        });
    });

    selects.forEach(($select) => {
        const select = new Select({
            $select: $select,
        });

        $select.addEventListener('change', () => {
            if (+$select.value !== currentSeason) {
                changeSeason(+$select.value);
            }
        });

        $modal.addEventListener('open', () => {
            select.checkPosition();
        });

    });

    $modalClose.addEventListener('click', () => {
        $modal.classList.remove(modalActiveClass);
        $playlist.classList.remove(playlistOpenModal);

        videoItems.forEach(($videoItem) => {
            $videoItem.querySelector('video').pause();
            $videoItem.querySelector('video').st();
            //$videoItem.querySelector('video').currentTime = 0;
        });

        setPlayingClass(-1, -1);
    });

    $playlistClose.addEventListener('click', () => {

        if ($modal.classList.contains(openPlaylistClass)) {
            $modal.classList.remove(openPlaylistClass);

            Array.from(document.querySelectorAll(togglePlaylistButton)).forEach(($togglePlaylistButton) => {
                $togglePlaylistButton.classList.remove(togglePlaylistButtonActiveClass);
            });
        } else {
            $modal.classList.add(openPlaylistClass);

            Array.from(document.querySelectorAll(togglePlaylistButton)).forEach(($togglePlaylistButton) => {
                $togglePlaylistButton.classList.add(togglePlaylistButtonActiveClass);
            });
        }


    });
