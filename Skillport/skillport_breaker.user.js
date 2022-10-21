// ==UserScript==
// @name         Skillport Cheats
// @namespace    http://example.com/tyrantrex/projects
// @version      6.0
// @description  Final. Updated 10/2022
// @author       TyrantRex
// @match        *://library.skillport.com/*
// @include      *://library.skillport.com/*
// ==/UserScript==
/* * * * * * * * * * * * * * * * * * * * * * * * *
Disclaimer:
  By using this, you agree to assume any and all risks that
  come with it, including the consequences.

Tips and Tidbits:
  1) Navigate to 'My Profile => Learning Transcript'
  2) Make sure that you've got a completed on date
     and do it fairly often
  3) You only get about 20 hours a day, so it'll
     take you a few weeks to max out hours.
     Don't try to do it all at once

Requirements and Directions:
  iPhones/iPads:
    1) 'Userscripts' from the app store
    2) Enable it in 'Settings > Safari > Extensions'
    3) Enable 'Settings > Safari > Request Desktop Websites > All Websites'
    4) Navigate to this script's URL in Safari
    5) Click the 'Aa' or '</>' button in the URL bar
    6) Press the install link in the green bar
    7) Scroll down in the extension popup and tap on install
    8) Grats! Now you can use this on the go from your phone or tablet.
    9) Start a course then double tap. Triple tap is experimental. If
       it glitches out then just tap through each topic one by one.

  PC/Mac:
    1) Install FireFox or Chrome
    2) Download and install the tampermonkey extension
    3) Navigate to this script's URL
    4) If it isn't the raw code page, press the raw button and install
    5a) Go to skillport, launch a course, and press 1
    5b) Alternatively, you can launch a course and double click. Triple click
        is experimental. If it glitches out then click through each topic one by one

  Usage:
    1) Launch a course
    2) Press 1 (not on the number pad)
    ** Optional: Pressing the TAB button will jump to the next lesson once
    ** Optional: Pressing 2 will run a faster, but not so accurate experiment
                 I was working on. Decided to call it a day and not waste
                 any more time on something that already works.
* * * * * * * * * * * * * * * * * * * * * * * * */

$(() => {
    const RandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

    const EnableAutoPlay = () => Control.navMgr.getMenuPanel().getSettingsPanel().autoPlayBtn.setSelected(true)

    const JumpToPage = (locID) => Control.navMgr.jumpToTopicAsync(locID, null)

    const PrevPage = () => Control.navMgr.prevTopicAsync(true, null, null)

    const NextPage = () => Control.navMgr.nextPageAsync(true, null)

    const SkipTest = () => Control.navMgr.skipTestAsync(Control.NavigationMgr.NEXT, null)

    const Navigate = () => {
        TestSummaryPage() ? SkipTest() : NextPage()

        SetScore()
    }

    const TestSummaryPage = () => {
        if (Control.navMgr.currentpage.id == "testSummaryPage") return true

        return false
    }

    const TestEnabled = () => Course.CourseObject.prototype.isCourseTestEnabled()

    const SetScore = (topic = null, minScore = 80) => {
        Core.context.course.lessons.forEach((lesson) => {
            lesson.topics.forEach((topic) => {
                let data = Core.context.getResultsMgr().getTopicStatusItem(topic.locID.getLocatorIDNoVersion())

                data.pre = data.best = data.last = RandomNumber(minScore, 100)
                data.visitStatus = Core.GenericConstants.C
                data.masteryStatus = Core.GenericConstants.M
                data.firstAttemptIsPreassess = true
            })

            Core.context.updateCompletionStatus()
        })
    }

    async function RunExploit() {
        EnableAutoPlay()

        //ChangeStartTime()

        for (let i = 0; i < 150; i++) {
            //Control.RiaContext.getInstance().isCourseComplete ? top.close() : Navigate()

            Course.CourseMapView.prototype.getCourseScore() >= "80%" ? top.close() : Navigate()
            await new Promise(resolve => setTimeout(() => resolve(), 400))
        }
    }

    document.addEventListener('keydown', e => {
        if (e.code === 'Digit1') RunExploit()
        if (e.code === 'Tab') Navigate()
    })

    document.addEventListener('click', () => SetScore())
    document.addEventListener('dblclick', () => RunExploit())
})
