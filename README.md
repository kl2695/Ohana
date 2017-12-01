# Ohana

[Ohana](https://kevinsfullstack.herokuapp.com) is a social media web application for friends to send messages to, share content with, and follow the activity of their close friends. The original idea behind Ohana (a hawaiian which roughly translates to "family") came from the recognization that most of today's current social media platforms encourage their users to interact with as many other users as possible. What's different about Ohana is that it's made for exactly the opposite purpose: interact and share only with the select group(s) of people you actually want to stay in touch with. Users can post "moments" with text and photos, upload pictures to their profile page, create groups with other users and message those groups, and like and comment on other users' posts. 

Ohana is a personal project by Kevin Lee.

![Ohana home page](https://kevinsfullstack.herokuapp.com)

## Features

- User accounts with secure authentication
- Post Moments with text and photo upload 
- Photo upload for profile pictures
- Like and comment on other users moments
- Feed of user moments, comments, and likes 
- Create groups of users with messaging and moments capability 

![demo_user moments: http://www.chime.audio/demo_user/tracks][moments]

## Project Design

Chime was designed and built in two weeks.

A [proposal][proposal] was drafted to help provide an implementation timeline during the development process.

A [database schema][schema] was prepared alongside the design proposal.

## Technology

Chime is a single-page application built on Rails and React.js, with many dependencies in both the backend and the frontend.

- [Backend technology][backend]
- [Frontend technology][frontend]
- [File storage][file storage] via Amazon Simple Storage Services (S3)

## Future Implementations

Chime is only a few degrees above being considered an MVP.

The features that will be added are listed in the [future implementations][future] outline.

[chime]: https://chime.audio
[home page]: ./docs/images/home_page.png "Chime home page"
[tracks]: ./docs/images/tracks.png "A user's tracks"
[proposal]: ./docs/proposal.md
[schema]: ./docs/schema.md
[backend]: ./docs/backend.md
[frontend]: ./docs/frontend.md
[file storage]: ./docs/file_storage.md
[future]: ./docs/future.md
