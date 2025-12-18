<template>
  <div class="story-container">
    <StoriesTopBar
        :progress="progress"
        :number-of-segments="1" />
    <div class="video-player">
      <video
          ref="videoPlayer"
          class="video-container"
          preload="metadata"
          muted=""
          autoplay=""
          playsinline=""
          @timeupdate="updateTime"
      >
      <source v-if="this.texts.lang === 'it'" :src="video_it" type="video/mp4">
      <source v-else-if="this.texts.lang === 'de'" :src="video_de" type="video/mp4">
      <source v-else :src="video_en" type="video/mp4">
      </video>
    </div>
    <div id="stories-segment-0" v-if="!isPlaying && !isPlayingHasBeenSet" class="stories-segment notification no_transform">
      <div class="h3 max_with_bigger">
        {{ this.texts.press }}
      </div>
    </div>
    <div id="text_container_stories" class="text_container hide">
      <div id="stories-segment-1" class="stories-segment" :style="animationPauseStyle">
        <div class="h5" v-html="this.texts.hello"></div>
        <div class="h2">
           <div v-if="this.name!==''">{{ this.name }}!</div>
        </div>
      </div>
      <div id="stories-segment-2" class="stories-segment">
        <div class="h5 max_with_bigger" v-html="this.texts.light_up"></div>
        <div class="h2">2024!</div>
      </div>
      <div id="stories-segment-3" v-show="!scip_vip_level" class="stories-segment">
        <img id="player_status"
             :src="vip_level_src" class="player_status"
             style="margin-top: 10vh"
             alt="level"
        />
        <div class="h5">
          {{ this.texts.you_reached }}
        </div>
        <div class="h3">
          <div v-if="this.level === '1'">
            {{ this.texts.vip_level_1 + this.texts.level }}
          </div>
          <div v-else-if="this.level ==='2'">
            {{ this.texts.vip_level_2 + this.texts.level}}
          </div>
          <div v-else-if="this.level === '3'">
            {{ this.texts.vip_level_3 + this.texts.level }}
          </div>
          <div v-else-if="this.level === '4'">
            {{ this.texts.vip_level_4 + this.texts.level }}
          </div>
          <div v-else-if="this.level === '5'">
            {{ this.texts.vip_level_5 + this.texts.level }}
          </div>
          <div v-else-if="this.level === '6'">
            {{ this.texts.vip_level_6 + this.texts.level }}
          </div>
          

        </div>
        <div v-if="this.level == '1' || this.level == '2' || this.level == '3' || this.level == '4' || this.level == '5' || this.level == '6'" class="h5">
          {{ this.texts.in_vip }}
        </div>
      </div>
      <div id="stories-segment-4" v-show="!scip_regular_level" class="stories-segment" :style="animationPauseStyle">
        <img id="player_status"
            :src="regular_level_src" class="player_status"
            style="margin-top: 10vh"
            alt="level"
        />
        <div class="h5">
          {{ this.texts.you_reached }}
        </div>
        <div class="h3">
          {{ this.texts.level_player + " " + this.regular_level }}
        </div>
        <div>
          <div v-if="this.regular_level == '1' || this.regular_level == '2' || this.regular_level == '3'
          || this.regular_level == '4' || this.regular_level == '5' || this.regular_level == '6'
          || this.regular_level == '7' || this.regular_level == '8' || this.regular_level == '9'
          || this.regular_level == '10' || this.regular_level == '11' || this.regular_level == '12'" class="h5">
            {{ this.texts.in_regular }}
          </div>
        </div>
        
      </div>
      <div id="stories-segment-5" v-show="!scip_top_wining" class="stories-segment" :style="animationPauseStyle">
        <img :src="top_wining_icon" class="top_wining_icon" alt="">
        <div class="h5">
          {{ this.texts.top_winnings }}
        </div>
        <div class="h2" :style="{ fontSize: topWinFontSize }">
          {{ this.top_winnings + " " + this.currency }}
        </div>
      </div>
      <div id="stories-segment-6" v-show="!scip_thumbnail" class="stories-segment" :style="animationPauseStyle">
        <img :src="favorite_game_thumbnail" class="favorite_game_thumbnail" alt="">
        <div class="h5 max_with_bigger" >
          {{ this.texts.slot }}
        </div>
        <div class="h3">
          {{ this.favorite_game_name}}
        </div>
      </div>
      <div id="stories-segment-7" v-show="!scip_cashback" class="stories-segment" :style="animationPauseStyle">
        <img :src="cashback_icon" class="cashback_icon" alt="">
        <div class="h5">
          {{ this.texts.cashback }}
        </div>
        <div class="h2" :style="{ fontSize: cashbackFontSize }">
          {{ this.cashback + " " + this.currency }}
        </div>

      </div>
      <div id="stories-segment-8" v-show="!scip_bonus" class="stories-segment">
        <img :src="bonuses_icon" class="bonuses_icon" alt="">
        <div class="h5">
          {{ this.texts.bonuses }}
        </div>
        <div class="h2" :style="{ fontSize: giftsFontSize }">
          {{ this.gifts + " " + this.currency }}
        </div>
      </div>

      <div id="stories-segment-9" v-show="!scip_spot_winnings" class="stories-segment" :style="animationPauseStyle">
        <img :src="sport_icon" class="sport_winings_icon" alt="">
        <div class="h5">
          {{ this.texts.sport_winings }}
        </div>
        <div class="h2" :style="{ fontSize: sport_winingsFontSize }">
          {{ this.sport_winings + " " + this.currency }}
        </div>
      </div>
      <div id="stories-segment-10" class="stories-segment" :style="animationPauseStyle">
        <div class="h5">
          {{ this.texts.time_to_reward }}
        </div>
        <div class="h3" style="margin-top: 3vh" v-html="this.texts.hero"></div>


      </div>
      <div id="stories-segment-11" class="stories-segment" :style="animationPauseStyle">
        <div class="h5" style="margin-top: 55vh" v-html="this.texts.please_accept">
        </div>
      </div>

      <div id="stories-segment-12" class="stories-segment" :style="animationPauseStyle">
        <div class="h5" style="margin-top: 55vh" v-html="this.texts.ooops">
        </div>
      </div>
      <div id="stories-segment-13" class="stories-segment no_transform" :style="animationPauseStyle">
        <div class="h4" style="margin-top: 55vh">
          {{ this.texts.real_gift }}
        </div>
        <div class="h3" style="color: white" v-html="this.texts.activate_promo"></div>
      </div>
      

      
      <div id="stories-segment-16" class="stories-segment margin_top_small no_transform" :style="animationPauseStyle">
        <div class="waiting_text" v-if="this.promocode === 'VIP2025' " >
          {{ this.texts.end_text_gift }}
        </div>
        <div class="waiting_text" v-if="this.promocode === '2025'">
          {{ this.texts.end_text_gift1 }}
        </div>
        <div class="present_placeholder"></div>
          <div class="end_button get_gift">
            <div class="promo-code" id="promo-code" @click="copied">
            {{ this.promocode }}
            </div>
            <img :src="copy_src" class="copy_icon" alt="" @click="copied" loading="lazy">
          </div>
        <div class="h6">
          {{ this.texts.end_text_gift_explain + this.promocode + this.texts.end_text_gift_explain1 }}
        </div>
        <img :src="copied_src" class="copied_icon" id="copied_icon" alt="" loading="lazy">
        <div class="end_button activate" @click="copyAndRedirect">
          {{ this.texts.end_btn_1 }}</div>
        <div class="end_button watch_again" @click="reloadPage()">
          <img :src="watchAgainIcon" class="watch_again_icon" alt="" loading="lazy">
          {{ this.texts.end_btn_2 }}</div>
      </div>
    </div>

      <div class="close_button" @click="close">
        <CloseButton />
      </div>

    <div class="pause_button" @click="togglePlayState">
      <desktopPausePlayButton
          :play-state="isPlaying" />
    </div>
    <div id="story_controls" class="story_controls">
      <div
          @mousedown="handleEvent('backward', $event)"
          @mouseup="handleEventEnd('backward', $event)"
          @touchstart="handleEvent('backward', $event)"
          @touchend="handleEventEnd('backward', $event)">
        <mobileControlArea
            position="left" />
      </div>
      <div
          @mousedown="handleEvent('forward', $event)"
          @mouseup="handleEventEnd('forward', $event)"
          @touchstart="handleEvent('forward', $event)"
          @touchend="handleEventEnd('forward', $event)">
        <mobileControlArea
            position="right" />
      </div>
      <div @click="jumpToSegment('backward')">
        <desktopControlButton
            position="left" />
      </div>
      <div @click="jumpToSegment('forward')">
        <desktopControlButton
            position="right" />
      </div>
    </div>
  </div>
</template>

<script src="./scripts.js"></script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@900&family=Rubik:wght@400;700;800;900&display=swap');
@import "~@theme/styles";
@import "styles";

</style>
