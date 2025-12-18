

import { ref, computed, onMounted, watch } from "vue";
import StoriesTopBar from "@components/Stories/UI/storiesTopBar.vue";
import mobileControlArea from "@components/Stories/UI/mobileControlArea.vue";
import desktopControlButton from "@components/Stories/UI/desktopControlButton.vue";
import desktopPausePlayButton from "@components/Stories/UI/desktopPausePlayButton.vue";
import CloseButton from "@components/Stories/UI/closeButton.vue";
import gsap from "gsap";
import availableLanguages from "/src/components/Stories/localization/available-languages.json";
import en from '@components/Stories/localization/en.json';
import it from '@components/Stories/localization/it.json';
import de from '@components/Stories/localization/de.json';
import fr from '@components/Stories/localization/fr.json';
import watchAgainIcon from "@components/Stories/img/icons/icon_replay.svg";
import video_en from '@components/Stories/img/video/en.mp4';
import video_it from '@components/Stories/img/video/it.mp4';
import video_de from '@components/Stories/img/video/de.mp4';
import video_fr from '@components/Stories/img/video/fr.mp4';
import regular from '@components/Stories/img/statuses/regular_512.webp';
import bronze from '@components/Stories/img/statuses/bronze_512.webp';
import silver from '@components/Stories/img/statuses/silver_512.webp';
import gold from '@components/Stories/img/statuses/gold_512.webp';
import platinum from '@components/Stories/img/statuses/platinum_512.webp';
import diamond from '@components/Stories/img/statuses/diamond_512.webp';
import level1 from '@components/Stories/img/statuses/level/1.webp';
import level2 from '@components/Stories/img/statuses/level/2.webp';
import level3 from '@components/Stories/img/statuses/level/3.webp';
import level4 from '@components/Stories/img/statuses/level/4.webp';
import level5 from '@components/Stories/img/statuses/level/5.webp';
import level6 from '@components/Stories/img/statuses/level/6.webp';
import level7 from '@components/Stories/img/statuses/level/7.webp';
import level8 from '@components/Stories/img/statuses/level/8.webp';
import level9 from '@components/Stories/img/statuses/level/9.webp';
import level10 from '@components/Stories/img/statuses/level/10.webp';
import level11 from '@components/Stories/img/statuses/level/11.webp';
import level12 from '@components/Stories/img/statuses/level/12.webp';
import casback_icon from '@components/Stories/img/casback_icon.webp';
import change_win from '@components/Stories/img/change_win.webp';
import copy_src from '@components/Stories/img/icons/copy.svg';
import copied_src from '@components/Stories/img/icons/copied.svg';
import maskImagePath from '@components/Stories/img/mask.png';
import top_wining_icon from '@components/Stories/img/icons/top_winings.webp';
import cashback_icon from '@components/Stories/img/icons/cashback.webp';
import bonuses_icon from '@components/Stories/img/icons/bonuses.webp';
import sport_icon from '@components/Stories/img/icons/sport.webp';



export default {
  name: "Verification",
  components: {
    StoriesTopBar,
    mobileControlArea,
    desktopControlButton,
    desktopPausePlayButton,
    CloseButton,
  },
  setup() {
    const letterSrc = ref('');
    const texts = ref('en');
    const currency = ref('USD');
    const promocode = ref('2025');
    const name = ref('');
    const days = ref(false);
    const regular_level = ref('');
    const level = ref('');
    const top_winnings = ref(0);
    const freespins = ref(0);
    const cashback = ref(0);
    const gifts = ref(0);
    const favorite_game_thumbnail = ref('');
    const favorite_game_name = ref('');
    const fire_type = ref(1);
    const end_link = ref('');
    const vip_level_src = ref('');
    const regular_level_src = ref('');
    const sport_winings = ref('');
    const light_up_start = ref(9999);
    const intro_moments_start = ref(9999);
    const intro_moments_end = ref(9999);
    const regular_level_start = ref(9999);
    const regular_level_end = ref(9999);
    const faw_game_start = ref(9999);
    const faw_game_end = ref(9999);
    const top_wining_start = ref(9999);
    const top_wining_end = ref(9999);
    const cashback_start = ref(9999);
    const cashback_end = ref(9999);
    const bonus_start = ref(9999);
    const bonus_end = ref(9999);
    const sport_winings_start = ref(9999);
    const sport_winings_end = ref(9999);
    const scip_vip_level = ref(true);
    const scip_regular_level = ref(true);
    const scip_thumbnail = ref(true);
    const scip_top_wining = ref(true);
    const scip_cashback = ref(true);
    const scip_bonus = ref(true);
    const scip_spot_winnings = ref(true);
    const hide_thumbnail = ref(true);
    const change_thumbnail_text_position = ref(false);
    const pressTimer = ref(null);
    const pressDuration = 500;
    const longPress = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const shouldSeek = ref(0);
    const isPlaying = ref(false);
    const isPaused = ref(false);
    const copyPressed = ref(false);
    const numberOfSegments = 6;
    const isPlayingHasBeenSet = ref(false);
    const videoPlayer = ref(null);
    const maskImage = ref(maskImagePath);
    const maskStyle = computed(() => {
      if (maskImage.value) {
        return {
          maskImage: `url(${maskImage.value})`,
          maskSize: 'cover',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url(${maskImage.value})`, // For webkit browsers
        };
      } else {
        return {};
      }
    });

    const currentSegment = computed(() => {
      const segmentLength = 7;
      return Math.floor(currentTime.value / segmentLength);
    });
    const animationPauseStyle = computed(() => ({
      "animation-play-state": isPaused.value ? "paused" : "running",
    }));
    const languageMap = {
      en,
      it,
      de,
      fr,
    };

    const close = () => {
      if (videoPlayer.value.currentTime < 90) {
      videoPlayer.value.currentTime = 90;
      tl.time(90);
      } else {
        const promoCodeElement = document.getElementById("promo-code");

        if (promoCodeElement) {
          navigator.clipboard.writeText(promoCodeElement.textContent || '').then(() => {
            if (copyPressed.value === true) {
            window.location.href = end_link.value;
            } else {
              const copiedIcon = document.getElementById("copied_icon");
              copiedIcon.style.opacity = "1";
              setTimeout(() => {
                window.location.href = end_link.value;
              }, 3000);
            }
          }).catch(err => {
            console.error('Failed to copy text: ', err);
          });
        } else {
          console.error('Promo code element not found');
        }
      }
    }

    const skips = () => {
      // segment-3 теперь не пропускаемый (light_up_moments)
      if (scip_regular_level.value === true && currentTime.value > regular_level_start.value && currentTime.value < regular_level_end.value) {
        videoPlayer.value.currentTime = regular_level_end.value;
        tl.time(regular_level_end.value);
      }
      if (scip_thumbnail.value === true && currentTime.value > faw_game_start.value && currentTime.value < faw_game_end.value) {
        videoPlayer.value.currentTime = faw_game_end.value;
        tl.time(faw_game_end.value);
      }
      if (scip_top_wining.value === true && currentTime.value > top_wining_start.value && currentTime.value < top_wining_end.value) {
        videoPlayer.value.currentTime = top_wining_end.value;
        tl.time(top_wining_end.value);
      }
      if (scip_cashback.value === true && currentTime.value > cashback_start.value && currentTime.value < cashback_end.value) {
        videoPlayer.value.currentTime = cashback_end.value;
        tl.time(cashback_end.value);
      }
      if (scip_bonus.value === true && currentTime.value > bonus_start.value && currentTime.value < bonus_end.value) {
        videoPlayer.value.currentTime = bonus_end.value;
        tl.time(bonus_end.value);
      }
      if (scip_spot_winnings.value === true && currentTime.value > sport_winings_start.value && currentTime.value < sport_winings_end.value) {
        videoPlayer.value.currentTime = sport_winings_end.value;
        tl.time(sport_winings_end.value);
      }
    }

    const updateTime = () => {
      currentTime.value = videoPlayer.value.currentTime;
      duration.value = videoPlayer.value.duration;
      if (videoPlayer.value.currentTime > 0 && !isPlayingHasBeenSet.value) {
        isPlaying.value = true;
        isPlayingHasBeenSet.value = true;
      }
      skips();
      if (currentTime.value === duration.value) {
        videoPlayer.value.currentTime = 89;
        videoPlayer.value.play();
      }
    };
    const progress = computed(() => {
      return currentTime.value && duration.value ? (currentTime.value / duration.value) * 100 : 0;
    });
    const tl = gsap.timeline({ paused: true });

    const jumpToSegment = (direction) => {
      const segmentLength = 6;
      const currentSegment_1 = Math.floor(currentTime.value / segmentLength);
      if (direction === "backward") {
        let newTime = segmentLength * (currentSegment_1 - 1);

        if (scip_spot_winnings.value === true && newTime >= sport_winings_start.value && newTime < sport_winings_end.value) {
          newTime = bonus_start.value;
        }
        if (scip_bonus.value === true && newTime >= bonus_start.value && newTime < bonus_end.value) {
          newTime = cashback_start.value;
        }
        if (scip_cashback.value === true && newTime >= cashback_start.value && newTime < cashback_end.value) {
          newTime = top_wining_start.value;
        }
        if (scip_top_wining.value === true && newTime >= top_wining_start.value && newTime < top_wining_end.value) {
          newTime = faw_game_start.value;
        }
        if (scip_thumbnail.value === true && newTime >= faw_game_start.value && newTime < faw_game_end.value) {
          newTime = regular_level_start.value;
        }
        if (scip_regular_level.value === true && newTime >= regular_level_start.value && newTime < regular_level_end.value) {
          newTime = intro_moments_start.value;
        }
        // segment-3 (vip_level) теперь не пропускаемый
        if (newTime < 0) {
          newTime = 0;
        }

        videoPlayer.value.currentTime = newTime;
        tl.time(newTime);
      } else if (direction === "forward") {
        let newTime = segmentLength * (currentSegment_1 + 1);
        videoPlayer.value.currentTime = newTime;
        tl.time(newTime);
        skips();
      }
    };

    const playerPause = () => {
      isPlaying.value = false;
      videoPlayer.value.pause();
      isPaused.value = true;
    };
    const playerPlay = () => {
      isPlaying.value = true;
      videoPlayer.value.play();
      isPaused.value = false;
    };

    const togglePlayState = () => {
      if (isPlaying.value) {
        isPlaying.value = false;
        videoPlayer.value.pause();
        isPaused.value = true;
      } else {
        isPlaying.value = true;
        videoPlayer.value.play();
        isPaused.value = false;
      }
    };

    const press = () => {
      playerPause();
      pressTimer.value = setTimeout(() => {
        longPress.value = true;
      }, pressDuration);
    };

    const release = (direction) => {
      clearTimeout(pressTimer.value);

      if (longPress.value) {
        playerPlay();
      } else {
        playerPlay();
        if (videoPlayer.value.currentTime > 0) {
        jumpToSegment(direction);}
      }
      longPress.value = false;
    };

    const handleEvent = (direction, event) => {
      if (event.type === "touchstart") {
        event.preventDefault();
        press(direction);
      } else if (event.type === "mousedown") {
        press(direction);
      }
    };

    const topWinFontSize = computed(() => {
      if (top_winnings.value && top_winnings.value.toString().length) {
        const length = top_winnings.value.toString().length;
        if (length < 5) return '7vh';
        if (length < 8) return '6vh';
        if (length < 14) return '4vh';
      }
      return '8.5vh';
    });

    const cashbackFontSize = computed(() => {
      if (cashback.value && cashback.value.toString().length) {
        const length = cashback.value.toString().length;
        if (length < 5) return '7vh';
        if (length < 8) return '6vh';
        if (length < 14) return '4vh';
      }
      return '8.5vh';
    });
    const sport_winingsFontSize = computed(() => {
      if (sport_winings.value && sport_winings.value.toString().length) {
        const length = sport_winings.value.toString().length;
        if (length < 5) return '7vh';
        if (length < 8) return '6vh';
        if (length < 14) return '4vh';
      }
      return '8.5vh';
    });

    const spinsFontSize = computed(() => {
      if (freespins.value && freespins.value.toString().length) {
        const length = freespins.value.toString().length;
        if (length < 5) return '7vh';
        if (length < 8) return '6vh';
        if (length < 14) return '4vh';
      }
      return '8.5vh';
    });
    const giftsFontSize = computed(() => {
      if (gifts.value && gifts.value.toString().length) {
        const length = gifts.value.toString().length;
        if (length < 5) return '7vh';
        if (length < 8) return '6vh';
        if (length < 14) return '4vh';
      }
      return '8.5vh';
    });



    const handleEventEnd = (direction, event) => {
      if (event.type === "touchend") {
        event.preventDefault();
        release(direction);
      } else if (event.type === "mouseup") {
        release(direction);
      }
    };


    let timeoutId = null;

    const copied = () => {

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }


      const promoCodeElement = document.getElementById("promo-code");

      if (promoCodeElement) {
        // Copy text to clipboard
        navigator.clipboard.writeText(promoCodeElement.textContent || '').then(() => {
          const copiedIcon = document.getElementById("copied_icon");
          // Only change the opacity and set timeout if the text is successfully copied
          copiedIcon.style.opacity = "1"; // Set the opacity to 1 immediately
          copyPressed.value = true;

          // Set a timeout to change the opacity back to 0 after 2000 milliseconds (2 seconds)
          timeoutId = setTimeout(() => {
            copiedIcon.style.opacity = "0";
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      } else {
        console.error('Promo code element not found');
      }
    }

    const copyAndRedirect = () => {
      const promoCodeElement = document.getElementById("promo-code");

      if (promoCodeElement) {
        navigator.clipboard.writeText(promoCodeElement.textContent || '').then(() => {
          window.location.href = end_link.value;
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      } else {
        console.error('Promo code element not found');
      }
    }

    onMounted(async () => {
      window.addEventListener("resize", () => {
        let vh = Math.round(window.innerHeight / 100);
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
      document.querySelector(':root').style.setProperty('--background-image', "url('mask')");

      const fullURL = window.location.href;
      const queryStartIndex = fullURL.indexOf('?');

      if (queryStartIndex !== -1) {
        const queryPart = fullURL.slice(queryStartIndex + 1);
        const params = queryPart.split('&').reduce((acc, pair) => {
          const [key, value] = pair.split('=');
          acc[key] = decodeURIComponent(value);
          return acc;
        }, {});

        texts.value = params.language;
        currency.value = params.currency;
        name.value = params.name;
        days.value = params.days;
        regular_level.value = params.regular_level;
        level.value = params.vip_level;
        gifts.value = Math.round(+(params.bonus || '').replace(',', '.'));
        if (params.promocode) {
          promocode.value = params.promocode;
        }
        sport_winings.value = Math.round(+(params.sport_winings || '').replace(',', '.'));
        top_winnings.value = Math.round(+(params.top_winnings || '').replace(',', '.'));
        freespins.value = Math.round(+(params.freespins || '').replace(',', '.'));
        cashback.value = Math.round(+(params.cashback || '').replace(',', '.'));
        scip_top_wining.value = top_winnings.value < 50;
        scip_bonus.value = top_winnings.value < 1;
        scip_cashback.value = cashback.value < 1;
        scip_spot_winnings.value = sport_winings.value < 30;
        favorite_game_thumbnail.value = params.favorite_game_thumbnail;
        favorite_game_name.value = params.favorite_game_name;
        if (favorite_game_name.value) {
          scip_thumbnail.value = false;
        }
        hide_thumbnail.value = params.favorite_game_thumbnail === ''
            || params.favorite_game_thumbnail == null
            || false;
        change_thumbnail_text_position.value = params.favorite_game_thumbnail !== '' && !favorite_game_name.value
            || params.favorite_game_thumbnail !== null && !favorite_game_name.value
            || !favorite_game_name.value;

        end_link.value = params.end_link;

        if (params.vip_level === '1') {
          vip_level_src.value = regular
          scip_vip_level.value = false;
          fire_type.value = 1;
        } else if (params.vip_level === '2') {
          vip_level_src.value = bronze;
          scip_vip_level.value = false;
          fire_type.value = 1;
        } else if (params.vip_level === '3') {
          vip_level_src.value = silver;
          scip_vip_level.value = false;
          fire_type.value = 2;
        } else if (params.vip_level === '4') {
          vip_level_src.value = gold;
          scip_vip_level.value = false;
          fire_type.value = 2;
        } else if (params.vip_level === '5') {
          vip_level_src.value = platinum;
          scip_vip_level.value = false;
          fire_type.value = 3;
        } else if (params.vip_level === '6') {
          vip_level_src.value = diamond;
          scip_vip_level.value = false;
          fire_type.value = 3;
        } else {
          scip_vip_level.value = true;
        }
        if (params.regular_level === '1') {
          regular_level_src.value = level1;
          scip_regular_level.value = false;
          fire_type.value = 1;
        } else if (params.regular_level === '2') {
          regular_level_src.value = level2;
          scip_regular_level.value = false;
          fire_type.value = 1;
        } else if (params.regular_level === '3') {
          regular_level_src.value = level3;
          scip_regular_level.value = false;
          fire_type.value = 1;
        } else if (params.regular_level === '4') {
          regular_level_src.value = level4;
          scip_regular_level.value = false;
          fire_type.value = 1;
        } else if (params.regular_level === '5') {
          regular_level_src.value = level5;
          scip_regular_level.value = false;
          fire_type.value = 2;
        } else if (params.regular_level === '6') {
          regular_level_src.value = level6;
          scip_regular_level.value = false;
          fire_type.value = 2;
        } else if (params.regular_level === '7') {
          regular_level_src.value = level7;
          scip_regular_level.value = false;
          fire_type.value = 2;
        } else if (params.regular_level === '8') {
          regular_level_src.value = level8;
          scip_regular_level.value = false;
          fire_type.value = 2;
        } else if (params.regular_level === '9') {
          regular_level_src.value = level9;
          scip_regular_level.value = false;
          fire_type.value = 3;
        } else if (params.regular_level === '10') {
          regular_level_src.value = level10;
          scip_regular_level.value = false;
          fire_type.value = 3;
        } else if (params.regular_level === '11') {
          regular_level_src.value = level11;
          scip_regular_level.value = false;
          fire_type.value = 3;
        } else if (params.regular_level === '12') {
          regular_level_src.value = level12;
          scip_regular_level.value = false;
          fire_type.value = 3;
        } else {
          scip_regular_level.value = true;
        }
        if (params.fire_type !== '' && params.fire_type !== null && params.fire_type !== undefined) {
          fire_type.value = 1;
        }
      } else {

        const defaultLanguage = navigator.language.split('-')[0];
        if (availableLanguages.languages.includes(defaultLanguage)) {
          texts.value = defaultLanguage;
        }

      }

      const locale = texts.value;

      if (availableLanguages.languages.includes(locale)) {
        texts.value = languageMap[locale];
      } else {
        texts.value = en;
      }



      if (fire_type.value === undefined) {
        fire_type.value = 1;
      }





      tl.pause();
      // hint
      tl.set("#stories-segment-0", 
        { className:"hide" });
      tl.set("#text_container_stories", 
        { className:"text_container"});
        // hello
      tl.from("#stories-segment-1", 
        {delay: 18, duration: 1, marginTop: "-22vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-1", 
            {delay: 2, duration: 1, marginTop: "-22vh", scale:0.5, opacity:0, ease: "power1.Out"});
      // light up
      light_up_start.value = tl.duration();
      tl.fromTo("#stories-segment-2", 
        {delay: 0.5, duration: 1.5, marginTop: "-22vh", scale:0.5, opacity:0, ease: "power1.Out"},
        {duration: 1.5, marginTop: "30vh", scale:1, opacity:1, ease: "power1.Out"});
      tl.to("#stories-segment-2", 
            {delay: 3.5, duration: 1, marginTop: "-22vh", scale:0.5, opacity:0, ease: "power1.Out"});

      // intro moments (light up 2025)
      intro_moments_start.value = tl.duration();

      tl.fromTo("#stories-segment-3", 
        {delay: 0.5, duration: 1.5, marginTop: "-22vh", scale:0.5, opacity:0, ease: "power1.Out"},
        {duration: 1.5, marginTop: "30vh", scale:1, opacity:1, ease: "power1.Out"});
      tl.to("#stories-segment-3", 
            {delay: 3.5, duration: 1, marginTop: "-22vh", scale:0.5, opacity:0, ease: "power1.Out"});
      intro_moments_end.value = tl.duration();

      // regular level
      regular_level_start.value = tl.duration();
      tl.from("#stories-segment-4", 
            {duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-4", 
            {delay: 3.3, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      regular_level_end.value = tl.duration();
      // top winnings
      top_wining_start.value = tl.duration();
      tl.from("#stories-segment-5", 
            { delay: 0.5, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-5", 
            {delay: 2.8, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      top_wining_end.value = tl.duration();
      // favorite game
      faw_game_start.value = tl.duration();
      tl.from("#stories-segment-6", 
            {delay: 1, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-6", 
            {delay: 2.8, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      faw_game_end.value = tl.duration();
      // cashback
      cashback_start.value = tl.duration();
      tl.from("#stories-segment-7", 
            {delay: 0.9, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-7", 
            {delay: 2.9, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      cashback_end.value = tl.duration();
      // bonuses
      bonus_start.value = tl.duration();
      tl.from("#stories-segment-8", 
            {delay: 1, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-8", 
            {delay: 2.8, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      bonus_end.value = tl.duration();
      // sport winnings
      sport_winings_start.value = tl.duration();
      tl.from("#stories-segment-9", 
                {delay: 1, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-9", 
                {delay: 2.8, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});    
      sport_winings_end.value = tl.duration();

      tl.from("#stories-segment-10", 
        {delay: 0.7, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-10", 
         {delay: 3.1, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});

      tl.from("#stories-segment-11", 
                    {delay: 1, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-11", 
                    {delay: 4, duration: 0.5, opacity:0, ease: "power1.Out"}); 
                    
      tl.from("#stories-segment-12", 
        {delay: -0.4, duration: 0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-12", 
                      {delay: 3.5, duration: 1.2, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});  
                      
      tl.from("#stories-segment-13", 
        {delay: 1.5, duration: 1, marginTop: "-18vh", scale:0.5, opacity:0, ease: "power1.Out"});
      tl.to("#stories-segment-13", 
        {delay: 3, duration: 1, opacity:0, ease: "power1.Out"});
      tl.from("#stories-segment-16", 
          {duration: 1, opacity:0, ease: "power1.Out"});
      tl.set("#story_controls", 
            {className: "story_controls height_70"});                
     


      watch(isPlaying, (newIsPlaying) => {
        if (newIsPlaying) {
          tl.time(videoPlayer.value.currentTime);
          tl.resume();
        } else {
          tl.time(videoPlayer.value.currentTime);
          tl.pause();

        }
      }, { immediate: true });


    });

    return {
      isPlayingHasBeenSet,
      progress,
      updateTime,
      shouldSeek,
      playerPause,
      playerPlay,
      isPlaying,
      press,
      release,
      numberOfSegments,
      handleEvent,
      handleEventEnd,
      jumpToSegment,
      togglePlayState,
      scip_thumbnail,
      videoPlayer,
      currentSegment,
      animationPauseStyle,
      watchAgainIcon,
      texts,
      currency,
      name,
      days,
      regular_level,
      level,
      top_winnings,
      cashback,
      favorite_game_thumbnail,
      favorite_game_name,
      fire_type,
      end_link,
      vip_level_src,
      regular_level_src,
      video_en,
      video_it,
      video_de,
      video_fr,
      scip_vip_level,
      scip_regular_level,
      scip_top_wining,
      scip_cashback,
      scip_bonus,
      scip_spot_winnings,
      hide_thumbnail,
      change_thumbnail_text_position,
      topWinFontSize,
      cashbackFontSize,
      spinsFontSize,
      casback_icon,
      sport_winings,
      sport_winingsFontSize,
      change_win,
      gifts,
      giftsFontSize,
      sport_icon,
      copy_src,
      promocode,
      copied_src,
      copied,
      copyAndRedirect,
      close,
      maskStyle,
      top_wining_icon,
      cashback_icon,
      bonuses_icon,
      texts,
    };
  },
  methods: {
    reloadPage() {
      window.location.reload();
    }
  }

};