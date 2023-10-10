<template>
  <div
    id="how-to-play"
    class="grid grid-cols-1 md:grid-cols-2 gap-5 bg-kaufland-red text-white p-5"
  >
    <div class="flex flex-col md:items-end items-center">
      <h1 class="font-kaufland-bold mb-2">PRATITE NAS</h1>
      <div class="flex flex-row md:justify-between">
        <div class="p-1">
          <a
            href="https://www.youtube.com/channel/UCH06X7-IKL79JxXMHbTq8Cg/videos"
            target="_blank"
          >
            <img
              src="../assets/images/YT.png"
              alt=""
              class="w-10 hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
        <div class="p-1">
          <a
            href="https://www.facebook.com/KauflandHrvatska/?locale=hr_HR"
            target="_blank"
          >
            <img
              src="../assets/images/facebook.png"
              alt=""
              class="w-10 hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
        <div class="p-1">
          <a href="https://www.instagram.com/kauflandhrvatska/" target="_blank">
            <img
              src="../assets/images/Insta.png"
              alt=""
              class="w-10 hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:items-start items-center">
      <h1 class="font-kaufland-bold mb-2">POLITIKA PRIVATNOSTI</h1>
      <a
        href="https://demo.kaufland.files.digitalarena.hr/politikaKolacica.pdf"
        download
        >O KOLAČIĆIMA</a
      >
      <a
        href="https://demo.kaufland.files.digitalarena.hr/politikaPrivatnosti.pdf"
        download
        >POLITIKA PRIVATNOSTI</a
      >
      <a href="https://demo.kaufland.files.digitalarena.hr/pravila.pdf" download
        >UVJETI KORIŠTENJA</a
      >
    </div>
  </div>
  <div class="flex flex-col items-end w-full bg-kaufland-red">
    <img
      src="../assets/images/kaufland-logo.png"
      width="50"
      class="bg-white m-5"
    />
  </div>
</template>
<script setup lang="ts"></script>
