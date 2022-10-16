<script setup lang="ts">
  function makeBold(text: string, size: string = 'lg'): string {
    return `<span class=text-${size}>${text}</span>`
  }
</script>

<template>
  <div class="flex-1 flex flex-col w-full overflow-hidden" data-cy="about">
    <div class="flex justify-center mt-6">
      <h1 class="text-5xl text-opacity-80 mb-16">About Me</h1>
    </div>
    <div class="container max-w-7xl mx-auto px-5">
      <section>
        <h2
          class="font-semibold text-2xl text-primaryAccent dark:text-primaryAccent2"
        >
          My Story
        </h2>
        <div class="py-8 md:text-lg">
          <p class="">
            Welcome, 
            <br />
            <br />
            My name is Michael Spinks. I am a self taught developer. My journey began in 2019. My methods of learning have
            primarily been through books and online based courses.
          </p>
          <br />
          <p>
            My journey started with learning<span class="font-semibold">PHP </span> and
            <span class="font-semibold">MySQL</span>,
            where I learned the fundamentals of programming and had an
            introduction to how network requests work('get', 'post', 'put',
            'patch', etc.) as well as the Object Oriented Programming paradigm.
            With <span class="font-semibold">PHP</span> I learned how to
            interact with databases as well as common vulnerabilites that exist
            when processing data from the client to databases. The most
            important rule that I learned was
            <span class="font-bold">NEVER TRUST USER INPUT</span>. Working with
            <span class="font-semibold">MySQL</span>, I learned database design
            principles such as ACID(Atomocity, Consistency, Isolation, and
            Durablity) and database normalization(each table's columns should be broken down and only contain
            information pertaining to that table).
          </p>
          <br />
          <p>
            After grasping a solid understanding of
            <span class="font-semibold">PHP</span>, it only made sense to learn
            <span class="font-semibold"
              >HTML, CSS, and Vanilla Javascript.</span
            >
            Learning <span class="font-semibold">Vanilla Javascript</span> and <span class="font-semibold">CSS</span> was fundemental before moving on
            to learning frameworks and libraries. I learned the basic structure
            of the DOM(Document Object Model), how to style the DOM with
            <span class="font-semibold">CSS</span>, how to interact with the DOM
            using <span class="font-semibold">Javascript</span>.
          </p>

          <br />

          <p>
            <span class="font-semibold">CSS</span> or
            <span class="font-semibold">Cascading Style Sheet</span> - the
            markup language necessary to produce beautiful applications. In my time spent soley dedicated to <span class="font-semibold">CSS</span>, the key
            takeaways came down to a few things, the Box Model(Padding, Border,
            Margin), layout systems(Grid or FlexBox), and Media
            Queries for responsive applications. I currenly use
            <a
              class="font-semibold"
              href="https://tailwindcss.com"
              target="_blank"
              alt="Go To Tailwind CSS Homepage"
              >TailwindCSS</a
            >
            to design.
          </p>
          <br />
          <p>
            <span class="font-semibold">JavaScript</span> - The brains of the
            entire client side or frontend operation. When it comes to
            interactivity, it all comes down to JavaScript. The key concepts
            grasped here were Callbacks, Promises, and Event Listeners.
            Understanding these concepts at the core level allows for complete
            control of how the application performs on the client side. I had spent some time
            with
            <a
              class="font-semibold"
              href="https://reactjs.org/"
              target="_blank"
              alt="Go To React Homepage"
              >React</a
            >. Since 2022, my path lead me to working with
            <a
              class="font-semibold"
              target="_blank"
              href="https://vuejs.org/"
              alt="Go To VueJS Homepage"
              >Vue</a
            >
            and
            <a
              class="font-semibold"
              target="_blank"
              href="https://v3.nuxtjs.org/"
              alt="Go To Nuxt Js Homepage"
              >Nuxt</a
            >
            for Server Side Rendered Applications. Working with Nuxt has also
            lead me to learn and become more familiar with
            <a
              class="font-semibold"
              target="_blank"
              href="https://nodejs.org/"
              alt="Go To Node Homepage"
              >Node</a
            >
            which allows for server side programming in
            <span class="font-semibold">Javascript</span>.
            <br />
            <br />
            <p>This app was created with <span class="font-semibold">Nuxt</span></p>
          </p>

        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
  a {
    @apply text-primaryAccent2  dark:text-primaryAccent hover:text-primaryAccent dark:hover:text-primaryAccent2;
  }
</style>
