import {Basic, Like, Output, Qualification} from "../types/basic";

export const toOutputs = (outputs: []) => {
    const outputModels: Output[] = outputs.map((o: {
        name: string;
        url: string;
        icon: string;
    }) => ({
        name: o.name,
        url: o.url,
        icon: o.icon
    } as Output))
    return outputModels
}

export const toLikes = (likes: []) => {
    const likeModels: Like[] = likes.map((l: String) => ({
        name: l,
    } as Like))
    return likeModels
}

export const toQualification = (qualifications: []) => {
    const qualificationModels: Qualification[] = qualifications.map((q: {
        name: string
        org: string
        url: string
        date: string
        note: string
    }) => ({
        name: q.name,
        org: q.org,
        url: q.url,
        date: q.date,
        note: q.note,
    } as Qualification))
    return qualificationModels
}

export const toBasic = (
    nickname: any,
    birthday: any,
    job: any,
    belongTo: any,
    outputs: [],
    likes: [],
    qualifications: [],
) => {
    const basicModel: Basic = {
        nickname,
        birthday,
        job,
        belongTo,
        outputs: toOutputs(outputs),
        likes: toLikes(likes),
        qualifications: toQualification(qualifications),
    }
    return basicModel
}