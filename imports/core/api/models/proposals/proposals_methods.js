import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Proposals } from './proposals';
import moment from 'moment';
import _ from 'underscore';

Meteor.methods({
    'proposals.add'(title) {
        check(title, String);

        if (title == '') {
            throw new Meteor.Error('403', 'Proposal statement can not be empty.');
        }
        const total = _.random(1000, 10000000);
        const doubt = _.random(1, 100000);
        const agreed = total - doubt;
        Proposals.insert({
            title,
            createdAt: new Date(),
            updatedAt: new Date(),
            total,
            agreed,
            doubt,
        });
    },
});
