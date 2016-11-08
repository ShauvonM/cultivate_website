import { Lab } from "../service/lab.service";

export const LABS: Lab[] = [
    {
        uuid: "bb0245b1-f068-4ee1-b85c-458ea161bc35",
        name: "Placeholder Class 1: Intro to Placeholders",
        type: "class",

        dates: ["2016-12-05"],
        times: ["16:30-05:00"],
        durations: [90],

        price: 50,

        blurb: "Come for the placeholders, stay for the placeholders!",
        description: `
            <p>Schlitz retro church-key, pinterest PBR&B cliche mumblecore gastropub kickstarter gochujang lo-fi woke try-hard coloring book bicycle rights. Shoreditch ennui occupy tote bag affogato migas banh mi, jianbing farm-to-table gochujang succulents humblebrag chambray forage letterpress. Prism tumeric la croix pitchfork, hell of direct trade ramps tilde cray fap. Ramps vaporware polaroid banjo, PBR&B tote bag salvia. Irony beard hella, single-origin coffee fap vape ennui prism. Freegan 3 wolf moon tofu ramps, synth marfa you probably haven't heard of them sriracha. Live-edge vice narwhal, photo booth portland plaid gentrify tbh four loko crucifix next level celiac.</p>
        `,

        teacherKey: "shauvon",

        spaces: 12,
        minSpaces: 0,
        spacesSold: 5,

        repeatType: 2,
        sessionCount: 4 // repeats every week, four times
    },

    {
        uuid: "9a2aad7a-fd62-41c6-98a8-2d2fd007d254",
        name: "Placeholder Class 2: Intensive Placeholder Study",
        type: "class",
        dates: ["2016-12-07"],
        times: ["09:00-05:00"],
        durations: [180],
        price: 150,
        blurb: "Learn all about how great placeholders are, while being inside a giant placeholder.",
        description: `
            <p>Fap 3 wolf moon air plant tumeric. Godard pug lumbersexual franzen, bicycle rights beard humblebrag direct trade fingerstache wolf sriracha glossier selvage roof party squid. Pork belly vinyl disrupt, sriracha fashion axe plaid artisan twee heirloom biodiesel. Salvia snackwave affogato fam, post-ironic kombucha flannel keytar ugh air plant asymmetrical vape lumbersexual prism. Sustainable shabby chic forage, umami squid pork belly YOLO fixie affogato fanny pack tumblr jianbing synth neutra. Actually raw denim church-key, franzen vinyl mumblecore chartreuse bicycle rights. Organic roof party ethical freegan locavore banh mi.</p>
        `,
        teacherKey: "shauvon",
        spaces: 12,
        minSpaces: 5,
        spacesSold: 2
    },

    {
        uuid: "f3a1d04d-6a3c-44c9-92ea-0e7e7c6c1202",
        name: "Director's Cut: Not Everybody Wants to Direct",
        type: "class",
        dates: ["2016-11-19"],
        times: ["10:00-05:00"],
        durations: [180],
        price: 50,
        blurb: "For Actors, Playwright, Designers, and More",
        description: `
            <p>For Actors, Playwright, Designers, and More</p>
            <p>Discover the components of directing that will best serve you in pursuit of your theatrical passions - without actually having to direct. In this one-day survey on the fundamentals of directing, you’ll experience the intersections and insights of collaboration by delving into the director’s mind and process.</p>
        `,
        teacherKey: "gil",
        spaces: 16,
        minSpaces: 8,
        spacesSold: 8
    },

    {
        uuid: "54d8efc3-f6f3-478e-8fbc-556192508a6a",
        name: "Stage to Page",
        type: "class",
        dates: ["2016-12-29"],
        times: ["16:00-05:00"],
        durations: [120],
        price: 75,
        blurb: "Get the most from your cold reads.",
        description: `
            <p>Rediscover the foundations and fun of theatre with a 4-session course in pulling apart plays. Get the most from your cold reads and table work as you move toward performance - or just geek out with the words that make acting and directing challenging and rewarding.</p>
        `,
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
        type: "class",
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
        teacherKey: "sarah",
        spaces: 15,
        minSpaces: 10,
        spacesSold: 12
    },

    {
        uuid: "be82eab8-a4cd-4ea2-811d-43dc630b6363",
        name: "Placeholder Class 3: Multiple Session Placeholders!",
        type: "class",
        dates: ["2016-12-07", "2016-12-09", "2016-12-12"],
        times: ["09:00-05:00", "10:00-05:00", "11:00-05:00"],
        durations: [180, 240, 90],
        price: 150,
        blurb: "Three sessions at three different times to REALLY get your placeholders rolling.",
        description: `
            <p>Fap 3 wolf moon air plant tumeric. Godard pug lumbersexual franzen, bicycle rights beard humblebrag direct trade fingerstache wolf sriracha glossier selvage roof party squid. Pork belly vinyl disrupt, sriracha fashion axe plaid artisan twee heirloom biodiesel. Salvia snackwave affogato fam, post-ironic kombucha flannel keytar ugh air plant asymmetrical vape lumbersexual prism. Sustainable shabby chic forage, umami squid pork belly YOLO fixie affogato fanny pack tumblr jianbing synth neutra. Actually raw denim church-key, franzen vinyl mumblecore chartreuse bicycle rights. Organic roof party ethical freegan locavore banh mi.</p>
        `,
        teacherKey: "shauvon",
        spaces: 12,
        minSpaces: 5,
        spacesSold: 2
    },

    {
        uuid: "e0687fcc-df82-479a-83f5-301f78541c70",
        name: "Monthly Improv Jam",
        type: "class", // "drop-in"?
        dates: ["2016-10-24"],
        times: ["18:00-05:00"],
        durations: [180],
        price: 0,
        blurb: "What is not to love about free Improv?",
        description: `
            <p>Fap 3 wolf moon air plant tumeric. Godard pug lumbersexual franzen, bicycle rights beard humblebrag direct trade fingerstache wolf sriracha glossier selvage roof party squid. Pork belly vinyl disrupt, sriracha fashion axe plaid artisan twee heirloom biodiesel. Salvia snackwave affogato fam, post-ironic kombucha flannel keytar ugh air plant asymmetrical vape lumbersexual prism. Sustainable shabby chic forage, umami squid pork belly YOLO fixie affogato fanny pack tumblr jianbing synth neutra. Actually raw denim church-key, franzen vinyl mumblecore chartreuse bicycle rights. Organic roof party ethical freegan locavore banh mi.</p>
        `,
        teacherKey: "shauvon",
        repeatType: 4
    }
]