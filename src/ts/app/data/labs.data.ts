import { Lab } from "../service/lab.service";

export const LABS: Lab[] = [
    {
        uuid: "bb0245b1-f068-4ee1-b85c-458ea161bc35",
        name: "Placeholder Class 1: Intro to Placeholders",
        format: "class",

        dates: ["2016-12-05"],
        times: ["16:30-05:00"],
        durations: [90],

        price: 50,

        blurb: "Come for the placeholders, stay for the placeholders!",
        description: `
            <p>Schlitz retro church-key, pinterest PBR&B cliche mumblecore gastropub kickstarter gochujang lo-fi woke try-hard coloring book bicycle rights. Shoreditch ennui occupy tote bag affogato migas banh mi, jianbing farm-to-table gochujang succulents humblebrag chambray forage letterpress. Prism tumeric la croix pitchfork, hell of direct trade ramps tilde cray fap. Ramps vaporware polaroid banjo, PBR&B tote bag salvia. Irony beard hella, single-origin coffee fap vape ennui prism. Freegan 3 wolf moon tofu ramps, synth marfa you probably haven't heard of them sriracha. Live-edge vice narwhal, photo booth portland plaid gentrify tbh four loko crucifix next level celiac.</p>
        `,
        icon: "box",

        teacherKey: "shauvon",

        spaces: 12,
        minSpaces: 0,
        spacesSold: 5,

        repeatType: 2,
        sessionCount: 4 // repeats every week, four times
    },

    {
        uuid: "b6b10e48-dfa5-43d9-b565-6c2d5a474841",
        name: "Disabled class: You shouldn't see this!",
        inactive: true,
        format: "class",
        dates: ["2016-05-19"],
        times: ["17:00-04:00"],
        durations: [120],
        blurb: "This is testing the ability to disable a class. If you see this, that ability is broken.",
        description: `<p>Uh oh.</p>`,
        icon: "exclamation",
        teacherKey: "shauvon",
        repeatType: 1,
        sessionCount: 5
    },

    {
        uuid: "9a2aad7a-fd62-41c6-98a8-2d2fd007d254",
        name: "Placeholder Class 2: Intensive Placeholder Study",
        format: "class",
        dates: ["2016-12-07"],
        times: ["09:00-05:00"],
        durations: [180],
        price: 150,
        blurb: "Learn all about how great placeholders are, while being inside a giant placeholder.",
        description: `
            <p>Fap 3 wolf moon air plant tumeric. Godard pug lumbersexual franzen, bicycle rights beard humblebrag direct trade fingerstache wolf sriracha glossier selvage roof party squid. Pork belly vinyl disrupt, sriracha fashion axe plaid artisan twee heirloom biodiesel. Salvia snackwave affogato fam, post-ironic kombucha flannel keytar ugh air plant asymmetrical vape lumbersexual prism. Sustainable shabby chic forage, umami squid pork belly YOLO fixie affogato fanny pack tumblr jianbing synth neutra. Actually raw denim church-key, franzen vinyl mumblecore chartreuse bicycle rights. Organic roof party ethical freegan locavore banh mi.</p>
        `,
        icon: "bulb",
        teacherKey: "shauvon",
        spaces: 12,
        minSpaces: 5,
        spacesSold: 2
    },

    {
        uuid: "f3a1d04d-6a3c-44c9-92ea-0e7e7c6c1202",
        name: "Director's Cut: Not Everybody Wants to Direct",
        format: "class",
        dates: ["2016-11-19"],
        times: ["10:00-05:00"],
        durations: [180],
        price: 50,
        blurb: "For Actors, Playwright, Designers, and More",
        description: `
            <p>For Actors, Playwright, Designers, and More</p>
            <p>Discover the components of directing that will best serve you in pursuit of your theatrical passions - without actually having to direct. In this one-day survey on the fundamentals of directing, you’ll experience the intersections and insights of collaboration by delving into the director’s mind and process.</p>
        `,
        icon: "chair",
        teacherKey: "gil",
        spaces: 16,
        minSpaces: 8,
        spacesSold: 8
    },

    {
        uuid: "54d8efc3-f6f3-478e-8fbc-556192508a6a",
        name: "Stage to Page",
        format: "class",
        dates: ["2016-11-29"],
        times: ["16:00-05:00"],
        durations: [120],
        price: 75,
        blurb: "Get the most from your cold reads.",
        description: `
            <p>Rediscover the foundations and fun of theatre with a 4-session course in pulling apart plays. Get the most from your cold reads and table work as you move toward performance - or just geek out with the words that make acting and directing challenging and rewarding.</p>
        `,
        icon: "book",
        teacherKey: "gil",
        spaces: 16,
        minSpaces: 10,
        spacesSold: 5,
        repeatType: 2,
        sessionCount: 4
    },

    {
        uuid: "f4b2e355-ed26-4201-b051-86dd9f421e98",
        name: "Mock Auditions: Commercials",
        format: "class",
        dates: ["2016-12-07"],
        times: ["13:00-05:00"],
        durations: [240],
        price: 125,
        blurb: "Learn how to book more work!",
        description: `
            <p>When it comes to booking on-camera commercial work, it doesn't matter if you've had years of professional training or if you're just starting out.  All that matters is what you do in the audition room, when the pressure is on and you have one shot to impress the client. The only way to improve your audition skills is through experience. </p>
            <p>In this four week lab, you will exercise your "in the moment" muscles through a series of mock auditions, covering the most common types of commercial work. </p>
            <p>Each scenario is modeled after real commercial castings so you can develop the confidence you need to make strong choices in the moment and BOOK MORE WORK!</p>
        `,
        icon: "film",
        teacherKey: "sarah",
        spaces: 15,
        minSpaces: 10,
        spacesSold: 12
    },

    {
        uuid: "be82eab8-a4cd-4ea2-811d-43dc630b6363",
        name: "Placeholder Class 3: Multiple Session Placeholders!",
        format: "class",
        dates: ["2016-12-07", "2016-12-09", "2016-12-12"],
        times: ["09:00-05:00", "10:00-05:00", "11:00-05:00"],
        durations: [180, 240, 90],
        price: 150,
        blurb: "Three sessions at three different times to REALLY get your placeholders rolling.",
        description: `
            <p>Fap 3 wolf moon air plant tumeric. Godard pug lumbersexual franzen, bicycle rights beard humblebrag direct trade fingerstache wolf sriracha glossier selvage roof party squid. Pork belly vinyl disrupt, sriracha fashion axe plaid artisan twee heirloom biodiesel. Salvia snackwave affogato fam, post-ironic kombucha flannel keytar ugh air plant asymmetrical vape lumbersexual prism. Sustainable shabby chic forage, umami squid pork belly YOLO fixie affogato fanny pack tumblr jianbing synth neutra. Actually raw denim church-key, franzen vinyl mumblecore chartreuse bicycle rights. Organic roof party ethical freegan locavore banh mi.</p>
        `,
        icon: "hammer",
        teacherKey: "shauvon",
        spaces: 12,
        minSpaces: 5,
        spacesSold: 2
    },

    {
        uuid: "e0687fcc-df82-479a-83f5-301f78541c70",
        name: "Monthly Improv Jam",
        format: "drop-in",
        dates: ["2016-10-24"],
        times: ["18:00-04:00"],
        durations: [180],
        price: 0,
        blurb: "What is not to love about free Improv?",
        description: `
            <p>Our Monthly Improv Jam is a public event for one and all (yes, that's what "public" means), on roughly the last Monday of every month. We'll have a few laughs, play some games, and see what Improv is all about.</p> 

            <p>You can stop by for a few minutes or a few hours. Participation is highly encouraged (just becase we know you'll love it), but it isn't strictly mandatory - you don't have to feel pressure to go too far outside your comfort zone. Just keep in mind that you'll definitely have more fun as a participant than a spectator, but it's entirely up to you!</p>

            <p>The Improv Jam will be tearing it up (not literally) at the Speaker's Studio, at 1437 Story Avenue, in beautiful Butchertown. Just look for the sign out on the sidewalk next to Story Avenue - you can't miss us!</p>

            <p>There's no better way to spend a Monday evening.</p>

            <p>If you want to peruse Improv games, and maybe pick out one or two that you would like to play, head over to the <a href="http://www.improvdatabase.com/" target="_blank">Improv Comedy Database</a>.</p>

            <p>See you there!</p>
        `,
        icon: "smile",
        teacherKey: "shauvon",
        repeatType: 4
    },

    {
        uuid: "18cf869b-1611-44fa-a784-25d46f62d57a",
        name: "Placeholder Class 4: Multiple Sessions in November!",
        format: "class",
        dates: ["2016-11-07", "2016-11-09", "2016-11-12"],
        times: ["09:00-05:00", "10:00-05:00", "11:00-05:00"],
        durations: [180, 240, 90],
        price: 150,
        blurb: "Three sessions at three different times to REALLY get your placeholders rolling.",
        description: `
            <p>Fap 3 wolf moon air plant tumeric. Godard pug lumbersexual franzen, bicycle rights beard humblebrag direct trade fingerstache wolf sriracha glossier selvage roof party squid. Pork belly vinyl disrupt, sriracha fashion axe plaid artisan twee heirloom biodiesel. Salvia snackwave affogato fam, post-ironic kombucha flannel keytar ugh air plant asymmetrical vape lumbersexual prism. Sustainable shabby chic forage, umami squid pork belly YOLO fixie affogato fanny pack tumblr jianbing synth neutra. Actually raw denim church-key, franzen vinyl mumblecore chartreuse bicycle rights. Organic roof party ethical freegan locavore banh mi.</p>
        `,
        //icon: "hammer",
        teacherKey: "shauvon",
        spaces: 12,
        minSpaces: 5,
        spacesSold: 2
    },
]