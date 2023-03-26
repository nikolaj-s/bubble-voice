import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ItalyIcon = () => {

    const color = useSelector(selectTextColor);

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8029 0.727402C11.6998 0.766777 11.5498 0.834277 11.471 0.877402L11.3285 0.954277L11.2779 0.914902C11.2104 0.862402 11.0885 0.851152 10.9985 0.888652C10.9592 0.905527 10.8935 0.918652 10.8523 0.918652C10.811 0.918652 10.7642 0.926152 10.7473 0.935527C10.7267 0.946777 10.6854 0.944902 10.6385 0.933652C10.5467 0.909277 10.496 0.920527 10.3929 0.986152C10.2935 1.05178 10.2579 1.11928 10.241 1.28428L10.2279 1.41553L10.1529 1.42115C10.0873 1.42678 9.92792 1.39303 9.81355 1.3499C9.79292 1.3424 9.75542 1.2974 9.73105 1.25053C9.65605 1.10803 9.58105 1.09865 9.48167 1.21865C9.44605 1.2599 9.40855 1.28053 9.3448 1.29178C9.29792 1.30115 9.25105 1.3199 9.24167 1.33303C9.21355 1.37615 9.18917 1.48303 9.17605 1.61803C9.1648 1.73615 9.16667 1.74928 9.2098 1.79615C9.35417 1.95178 9.23042 1.99303 9.00542 1.86365C8.9173 1.81303 8.87417 1.80928 8.76167 1.84303C8.66605 1.87115 8.53105 2.00615 8.53105 2.07365C8.53105 2.13365 8.61167 2.30803 8.65855 2.35115L8.69792 2.3849L8.65292 2.4524C8.5948 2.53865 8.5948 2.55928 8.65292 2.59865C8.71292 2.63803 8.71292 2.6699 8.6548 2.69615C8.61542 2.71303 8.60417 2.71115 8.5798 2.67178C8.56292 2.64553 8.53667 2.5799 8.52167 2.52178C8.50855 2.46553 8.4898 2.40928 8.4823 2.39803C8.44855 2.34178 8.05667 2.44303 8.03417 2.51428C8.0248 2.54053 8.00605 2.5499 7.95355 2.5499C7.81292 2.5499 7.7623 2.46365 7.7623 2.21803C7.7623 2.10178 7.75667 2.07928 7.7248 2.0624C7.67792 2.03803 7.62917 2.06053 7.59542 2.12615C7.5748 2.16365 7.5598 2.17115 7.51855 2.16178C7.45105 2.14865 7.3948 2.18053 7.3498 2.25553C7.30667 2.32303 7.30292 2.3924 7.33292 2.49365C7.36292 2.59115 7.30667 2.69053 7.12292 2.8649C7.03855 2.94553 6.9673 3.0299 6.95792 3.06365C6.94855 3.09553 6.93355 3.19303 6.92792 3.28115C6.91855 3.4049 6.9223 3.45178 6.94292 3.4949C6.96542 3.53615 6.9673 3.55865 6.9523 3.5924C6.92792 3.6449 6.90355 3.64678 6.81917 3.61115C6.76105 3.58865 6.75355 3.57553 6.71605 3.41803C6.69355 3.32615 6.6748 3.21365 6.6748 3.1649C6.6748 3.06553 6.61105 2.98115 6.53792 2.98115C6.44042 2.98115 6.36167 2.93428 6.23042 2.80115L6.09542 2.6624L6.0973 2.46928C6.09917 2.1449 6.03917 2.09053 5.83292 2.23115C5.71667 2.31178 5.6998 2.33428 5.6998 2.41678C5.6998 2.48428 5.62855 2.55178 5.5723 2.53678C5.47667 2.5124 5.44667 2.63615 5.50292 2.8274L5.53292 2.92678L5.48042 2.9699C5.45042 2.99428 5.38855 3.08615 5.34355 3.17428L5.25917 3.33553L5.1973 3.29615L5.13542 3.25865L5.07167 3.3299L5.00605 3.40115L4.88792 3.37865C4.82417 3.3674 4.72855 3.34678 4.67417 3.33365C4.57855 3.31303 4.57667 3.31303 4.50917 3.37303C4.4398 3.43303 4.4398 3.43303 4.28792 3.42178C4.1548 3.41053 4.1248 3.41428 4.05917 3.44803C3.98042 3.49115 3.90917 3.49865 3.89042 3.46865C3.86417 3.4274 3.78355 3.45178 3.72355 3.51928C3.67105 3.57553 3.64105 3.58865 3.56042 3.60178C3.50417 3.60928 3.4348 3.62428 3.4048 3.63553L3.35042 3.65803L3.36167 3.8099C3.37292 3.94678 3.38042 3.96928 3.43105 4.02178C3.46105 4.05365 3.52105 4.10053 3.5623 4.12678C3.62417 4.16428 3.6373 4.18303 3.6373 4.23178C3.6373 4.37615 3.76855 4.59365 3.85292 4.59365C3.89042 4.59365 3.9373 4.64803 3.9373 4.68928C3.9373 4.7099 3.90917 4.75115 3.8773 4.78303C3.82667 4.82803 3.81542 4.8524 3.81542 4.91615C3.81542 4.99115 3.81355 4.99303 3.69355 5.05678C3.62605 5.09053 3.54917 5.1449 3.52292 5.1749C3.49667 5.20678 3.46105 5.23115 3.44417 5.23115C3.4273 5.23115 3.36917 5.24803 3.3148 5.27053C3.22105 5.30615 3.21355 5.30803 3.16292 5.27803C3.04667 5.20865 3.0148 5.31928 3.11792 5.4374C3.2323 5.5724 3.27542 5.6624 3.2848 5.79553C3.2998 5.97928 3.31667 5.9999 3.44792 5.9999C3.50792 5.9999 3.5848 6.00553 3.61855 6.01115C3.67667 6.02428 3.67855 6.02428 3.66542 6.10678C3.65605 6.1724 3.6598 6.19865 3.68605 6.22678C3.71605 6.26053 3.71605 6.2624 3.68042 6.2624C3.61855 6.2624 3.58667 6.32053 3.5773 6.4499C3.5698 6.5399 3.5548 6.59053 3.51917 6.64303C3.46855 6.71803 3.46667 6.81178 3.51542 6.89053C3.52855 6.91303 3.5323 6.94865 3.52292 6.98053C3.49667 7.07428 3.5398 7.16053 3.6973 7.33303C3.82292 7.46803 3.86042 7.49803 3.91667 7.50553C3.95605 7.50928 4.03292 7.53553 4.08917 7.56365C4.18667 7.60865 4.20542 7.61053 4.40792 7.60115C4.52605 7.5974 4.6498 7.58803 4.68167 7.58428C4.73605 7.57865 4.74355 7.5824 4.74355 7.62178C4.74355 7.64615 4.75667 7.67428 4.77355 7.68365C4.80167 7.69865 4.80167 7.71365 4.78105 7.82615C4.75667 7.94053 4.75105 7.9499 4.70605 7.9499C4.62355 7.9499 4.5373 8.08303 4.5073 8.25553C4.49042 8.3549 4.51667 8.37553 4.67605 8.39053C4.79042 8.3999 4.84105 8.39428 4.98917 8.3549C5.08667 8.32865 5.20292 8.29865 5.24792 8.2874C5.31167 8.27053 5.36417 8.23115 5.49355 8.10365C5.62667 7.97053 5.6623 7.92178 5.69042 7.83928C5.70917 7.78303 5.74855 7.69865 5.77667 7.65178C5.80667 7.6049 5.83105 7.55615 5.83105 7.54303C5.83105 7.5299 5.86667 7.51115 5.9098 7.49803C6.0073 7.47178 6.1123 7.36865 6.1123 7.2974C6.1123 7.21678 6.1873 7.13053 6.29605 7.08553C6.35042 7.06303 6.43292 7.0199 6.48167 6.98803C6.55292 6.93928 6.58855 6.9299 6.6748 6.92803C6.76855 6.92803 6.7948 6.9374 6.8923 7.0049C7.0348 7.1024 7.19417 7.19053 7.26167 7.2074C7.30105 7.21678 7.32355 7.20928 7.3573 7.17553L7.4023 7.13053L7.58792 7.26553C7.69105 7.34053 7.7923 7.40615 7.81292 7.41365C7.83542 7.42115 7.8598 7.45678 7.87667 7.50553C7.89167 7.5524 7.9423 7.6274 8.00417 7.69115C8.08667 7.77928 8.11667 7.7999 8.16542 7.7999C8.22917 7.7999 8.2873 7.75303 8.2873 7.70053C8.2873 7.67615 8.30792 7.6799 8.41292 7.72678C8.48042 7.75865 8.5573 7.78678 8.58167 7.78865C8.62667 7.79428 8.8573 8.03803 8.8873 8.11303C8.89667 8.13553 8.9173 8.2574 8.9323 8.3849C8.9473 8.5124 8.9698 8.6399 8.98105 8.67178C8.99417 8.70178 9.01105 8.80303 9.02042 8.89678L9.03542 9.06553L9.1198 9.14053C9.19667 9.2099 9.20605 9.22678 9.2323 9.36553C9.25105 9.45928 9.27542 9.5249 9.29605 9.5399C9.3148 9.5549 9.33542 9.61115 9.34855 9.68803C9.3673 9.80053 9.36542 9.81928 9.33542 9.8699C9.27167 9.9749 9.30917 10.1755 9.39542 10.2018C9.6148 10.2655 9.72355 10.303 9.73667 10.3199C9.74417 10.3312 9.74605 10.3912 9.73855 10.4549C9.72917 10.5562 9.73292 10.573 9.7723 10.618C9.8023 10.6537 9.8398 10.6724 9.89792 10.678C9.9973 10.6912 10.0029 10.693 10.1173 10.7999C10.1698 10.8468 10.241 10.9443 10.2842 11.0249C10.3385 11.1262 10.3704 11.1674 10.4004 11.1712C10.4285 11.1749 10.4492 11.1974 10.4623 11.2405C10.4735 11.2743 10.5242 11.3399 10.5729 11.3868C10.646 11.4562 10.6817 11.4749 10.7548 11.4843C11.006 11.5162 11.081 11.5555 11.081 11.653C11.081 11.7112 11.1335 11.7749 11.1823 11.7749C11.246 11.7749 11.3248 11.8893 11.3848 12.0655C11.4129 12.148 11.4467 12.2212 11.4598 12.2287C11.4729 12.2343 11.5535 12.2624 11.6398 12.2887C11.8835 12.3655 11.9998 12.4649 11.9998 12.5999C11.9998 12.6543 12.146 12.9337 12.191 12.9637C12.2154 12.9787 12.2604 12.9974 12.2904 13.0049C12.401 13.0312 12.4835 13.0855 12.5304 13.1662C12.5567 13.2112 12.6185 13.288 12.6692 13.3405C12.7498 13.4249 12.7779 13.4399 12.9598 13.4962C13.0685 13.5318 13.1773 13.573 13.1998 13.588C13.2223 13.6049 13.2617 13.6612 13.2842 13.7155C13.361 13.8899 13.4548 13.9274 13.6217 13.8562C13.7679 13.7924 13.8354 13.7905 13.9404 13.843C14.0754 13.9105 14.2835 13.9743 14.3304 13.963C14.4823 13.9237 14.4673 13.918 14.6004 14.0549C14.681 14.1393 14.7429 14.2237 14.7767 14.3005C14.8067 14.3662 14.8685 14.4599 14.9154 14.5105C14.9942 14.5949 15.0017 14.608 14.9885 14.6699C14.9735 14.7543 15.0092 14.8143 15.1029 14.8574C15.1779 14.8949 15.2623 14.8874 15.371 14.8368C15.4292 14.8087 15.4329 14.8087 15.5042 14.8743C15.5435 14.9099 15.5942 14.9455 15.6167 14.953C15.6823 14.9737 15.671 14.9924 15.5379 15.0993C15.4929 15.1349 15.4854 15.1555 15.4817 15.253C15.4779 15.3562 15.4817 15.3655 15.5192 15.3712C15.5417 15.3749 15.6035 15.3543 15.6598 15.3262C15.7423 15.283 15.7929 15.2718 15.9617 15.2624C16.1304 15.2512 16.1735 15.2418 16.2223 15.2062C16.286 15.1593 16.2898 15.1612 16.3479 15.2905C16.3685 15.3318 16.4173 15.4237 16.4604 15.4968C16.5485 15.6449 16.5542 15.6918 16.4979 15.7949C16.4585 15.868 16.4585 15.8718 16.4904 15.9899C16.5204 16.0987 16.5317 16.1155 16.6085 16.1643C16.6554 16.1943 16.7192 16.2187 16.7473 16.2187C16.781 16.2187 16.7998 16.228 16.7998 16.2449C16.7998 16.2955 16.8917 16.3818 16.9985 16.4324C17.0567 16.4605 17.1317 16.5037 17.1654 16.528C17.1973 16.5543 17.2423 16.5749 17.2648 16.5749C17.2854 16.5749 17.3473 16.5337 17.4035 16.483L17.501 16.393L17.5723 16.4399C17.6735 16.5055 17.7692 16.7099 17.7917 16.9087C17.7992 16.9893 17.8217 17.0774 17.8385 17.1037C17.8554 17.128 17.8817 17.1955 17.8985 17.2518C17.9398 17.3905 18.0392 17.5818 18.1198 17.6793C18.1967 17.7712 18.2004 17.7824 18.2135 17.9999C18.2192 18.0974 18.2417 18.2174 18.2698 18.3055C18.2979 18.388 18.3185 18.4949 18.3185 18.553C18.3185 18.643 18.3242 18.658 18.3767 18.6937C18.4517 18.748 18.4742 18.8118 18.4592 18.9243C18.4404 19.0518 18.3542 19.1512 18.2735 19.138C18.2267 19.1305 18.1948 19.1437 18.1179 19.2018C18.0635 19.2412 18.0073 19.2749 17.9904 19.2749C17.8704 19.2749 17.8573 19.378 17.9548 19.5374L18.0223 19.6462L17.9623 19.783C17.8985 19.9293 17.8404 20.0043 17.7467 20.0624C17.7167 20.0812 17.6642 20.143 17.6304 20.1974C17.5723 20.2949 17.5704 20.3005 17.5779 20.4749C17.5892 20.6924 17.6042 20.7862 17.6323 20.8105C17.6585 20.8312 17.951 20.8687 18.0973 20.8687C18.2192 20.8687 18.3635 20.8199 18.4554 20.7505C18.5248 20.698 18.656 20.458 18.656 20.3849C18.656 20.3287 18.7685 20.1543 18.8304 20.113C18.8529 20.098 18.9017 20.0793 18.9373 20.0718C19.031 20.053 19.1098 20.0005 19.1529 19.9274C19.1867 19.8712 19.1904 19.8299 19.1923 19.5093C19.1923 19.3124 19.1998 19.1362 19.2054 19.1155C19.2279 19.0555 19.4285 18.9224 19.6198 18.8418C19.7942 18.7687 19.8017 18.7687 19.8579 18.7987C19.9085 18.8249 19.9292 18.8249 20.0042 18.8043C20.1167 18.7743 20.1504 18.7443 20.1654 18.6599C20.171 18.6224 20.1804 18.5755 20.186 18.5587C20.1917 18.5418 20.171 18.5005 20.1392 18.4649C20.066 18.3824 20.0548 18.3243 20.0904 18.2399C20.1279 18.1499 20.126 18.0768 20.0867 18.0337C20.0585 18.0018 20.0585 17.9943 20.0867 17.9324C20.126 17.8518 20.126 17.8068 20.0904 17.7393C20.0529 17.6643 19.9648 17.5949 19.8148 17.5218C19.6892 17.458 19.6498 17.428 19.4248 17.1993C19.3254 17.0999 19.2898 17.0774 19.1792 17.0437C19.106 17.0212 19.0498 16.993 19.0498 16.978C19.0498 16.9649 19.0967 16.8974 19.1548 16.8262C19.286 16.6668 19.3123 16.6068 19.3123 16.468C19.3123 16.3537 19.3292 16.3143 19.4267 16.2093C19.4548 16.1774 19.5129 16.0724 19.5542 15.9749C19.6273 15.8043 19.6385 15.7893 19.841 15.5962C19.9573 15.4855 20.0604 15.3955 20.0698 15.3937C20.0773 15.3937 20.1129 15.4162 20.1448 15.4443L20.2048 15.4968L20.0998 15.5343C20.0117 15.5662 19.9967 15.5793 19.991 15.6243C19.9854 15.6693 19.9948 15.6805 20.066 15.7124C20.111 15.733 20.171 15.7499 20.2029 15.7499C20.2329 15.7499 20.3004 15.7705 20.3529 15.7949C20.6042 15.9149 20.6754 15.9374 20.801 15.9374C20.8685 15.9374 20.9623 15.928 21.0073 15.9149C21.176 15.8699 21.2323 15.9637 21.3748 16.5149C21.416 16.6724 21.8135 17.0249 21.9542 17.0249C22.0123 17.0249 22.1042 16.9349 22.1248 16.8599C22.1342 16.8224 22.1567 16.7193 22.1717 16.6312C22.1904 16.5337 22.2279 16.4212 22.2692 16.3405C22.3085 16.2637 22.3367 16.1793 22.3385 16.1362C22.3404 16.0705 22.3292 16.0555 22.2242 15.958C22.1604 15.8999 22.0629 15.7818 22.0067 15.6937C21.8792 15.493 21.7123 15.3337 21.5904 15.2999C21.5135 15.2774 21.4985 15.2662 21.4667 15.193C21.4367 15.1199 21.4179 15.1049 21.296 15.0487C21.221 15.0149 21.0279 14.9212 20.8685 14.8443C20.5835 14.7037 20.5742 14.698 20.4242 14.533C20.2535 14.3493 20.0792 14.2368 19.8935 14.1937C19.8373 14.1805 19.7154 14.1355 19.6217 14.0943C19.5298 14.053 19.3498 13.9799 19.2242 13.9293C18.926 13.8112 18.8867 13.7905 18.7967 13.7062C18.7554 13.6668 18.6504 13.6049 18.5623 13.5655C18.4742 13.5262 18.3767 13.4755 18.3467 13.453C18.2867 13.408 18.1498 13.2037 18.1498 13.1587C18.1498 13.1118 18.2248 13.0124 18.2735 12.9937C18.3579 12.9618 18.5623 12.7687 18.5623 12.7218C18.5623 12.6993 18.5792 12.6655 18.5998 12.6468C18.6204 12.628 18.6373 12.6018 18.6373 12.5905C18.6373 12.508 18.3879 12.3299 18.2473 12.3093C18.1385 12.2943 17.9623 12.3543 17.8835 12.4312L17.8329 12.4818L17.7654 12.4368C17.6735 12.3749 17.5892 12.3637 17.4823 12.4012C17.366 12.4405 17.1935 12.4424 17.1935 12.403C17.1935 12.3599 17.1242 12.3337 17.0379 12.3468C16.901 12.3674 16.6554 12.2887 16.5054 12.1762C16.4717 12.1499 16.4023 12.1162 16.3517 12.1012C16.2635 12.0712 16.2579 12.0637 16.2092 11.9512C16.1492 11.8124 16.0554 11.7187 15.8529 11.6005C15.671 11.4955 15.6279 11.4505 15.581 11.323C15.536 11.1974 15.4985 11.1655 15.356 11.128C15.2154 11.0905 15.0954 10.9499 15.0673 10.7905C15.0598 10.7493 15.011 10.6293 14.9604 10.5243C14.9004 10.4005 14.8629 10.2937 14.8517 10.2149C14.831 10.0668 14.7485 9.77615 14.6885 9.63178C14.6623 9.5699 14.621 9.46303 14.5948 9.39178C14.5704 9.3224 14.5367 9.24178 14.5217 9.21178C14.5067 9.18365 14.4935 9.1199 14.4935 9.07115C14.4935 9.0224 14.4842 8.96053 14.4729 8.93053C14.4467 8.85928 14.3492 8.7599 14.2592 8.7149C14.2179 8.6924 14.111 8.61928 14.0229 8.5499C13.9348 8.48053 13.8373 8.40928 13.8073 8.39428C13.7773 8.37928 13.6742 8.30053 13.5767 8.22178C13.4079 8.08678 13.3123 8.02678 13.1623 7.96865C13.0854 7.93865 12.6954 7.6124 12.5417 7.45115C12.4479 7.35178 12.431 7.3199 12.3692 7.13053C12.3185 6.98053 12.2998 6.88865 12.2998 6.8024C12.2998 6.7199 12.2829 6.6374 12.2435 6.5249C12.1817 6.35428 12.176 6.28678 12.2079 6.15928C12.2285 6.08053 12.2304 6.07678 12.266 6.10115C12.2867 6.11615 12.3185 6.12365 12.3354 6.11803C12.3992 6.09553 12.4667 6.01303 12.4779 5.94178C12.4854 5.89678 12.5004 5.86865 12.5173 5.86865C12.5585 5.86865 12.6054 5.78053 12.5923 5.72803C12.5754 5.66053 12.4592 5.53678 12.3448 5.46365L12.2473 5.40178L12.2492 5.24615C12.251 5.13178 12.2435 5.07553 12.2192 5.03428C12.1798 4.9649 12.1779 4.85803 12.2154 4.73615C12.2304 4.68553 12.2435 4.61615 12.2435 4.5824C12.2435 4.53178 12.2529 4.51865 12.2998 4.50365C12.3298 4.4924 12.3935 4.45678 12.4404 4.4249L12.5267 4.36678L12.5473 4.4249C12.5754 4.5074 12.6242 4.52053 12.7592 4.48115C12.9917 4.41178 13.166 4.32553 13.2729 4.22803C13.331 4.17553 13.4173 4.10428 13.4642 4.07053C13.5242 4.02928 13.556 3.99178 13.5635 3.95428C13.5767 3.8849 13.6048 3.8849 13.7942 3.94865C13.8748 3.9749 13.9929 4.00115 14.0585 4.00678C14.171 4.01803 14.1785 4.01615 14.2367 3.9599C14.3229 3.87553 14.396 3.86615 14.4617 3.9299C14.501 3.96553 14.5104 3.98428 14.4954 3.99928C14.4485 4.04615 14.4729 4.11928 14.5498 4.1699C14.591 4.19615 14.636 4.21865 14.651 4.21865C14.666 4.21865 14.7017 4.22803 14.726 4.24115C14.7973 4.27303 14.8498 4.21865 14.8498 4.1174C14.8498 4.00865 14.7429 3.79115 14.6604 3.73303C14.6248 3.70678 14.5535 3.64865 14.501 3.60365L14.4054 3.52115L14.396 3.38053C14.3867 3.2324 14.3698 3.20615 14.2929 3.20615C14.2254 3.20615 14.2423 3.1574 14.3323 3.09553C14.4335 3.02615 14.4935 2.95303 14.4935 2.89865C14.4935 2.87428 14.4448 2.8124 14.3717 2.73928C14.2573 2.62865 14.2442 2.62115 14.1842 2.63053C14.1317 2.6399 14.1148 2.63428 14.0998 2.60615C14.0642 2.54053 14.0773 2.49928 14.141 2.47303C14.1748 2.4599 14.2367 2.41303 14.2779 2.3699C14.3342 2.31178 14.3754 2.2874 14.4373 2.27428C14.5385 2.25553 14.5667 2.20115 14.5385 2.08678C14.5217 2.0174 14.5179 2.01553 14.3435 1.9574C14.2292 1.91803 14.126 1.89553 14.0529 1.89553C13.9292 1.89365 13.691 1.8599 13.4473 1.80928C13.361 1.7924 13.2654 1.78115 13.2335 1.7849C13.1942 1.7924 13.1342 1.77365 13.0329 1.7249C12.8229 1.62178 12.6485 1.56928 12.5698 1.5824C12.5004 1.5974 12.4423 1.5674 12.3242 1.45678C12.266 1.4024 12.2642 1.39865 12.2904 1.3349C12.3485 1.19803 12.3167 1.14178 12.1723 1.1249C12.0935 1.11553 12.0842 1.1099 12.071 1.05553C12.0598 1.01053 12.0635 0.978652 12.0842 0.939277C12.1179 0.871777 12.1217 0.710527 12.0898 0.678652C12.0542 0.643027 12.0054 0.652402 11.8029 0.727402Z" fill={color}/>
<path d="M7.22396 13.828C7.20146 13.843 7.17896 13.8842 7.17146 13.918C7.16396 13.9499 7.13584 14.0099 7.10959 14.0492C7.06459 14.1149 7.05709 14.1205 6.99334 14.1092C6.93709 14.0999 6.92021 14.1055 6.88084 14.1486C6.85459 14.1749 6.79084 14.2255 6.73834 14.2592C6.68584 14.293 6.61084 14.3549 6.57146 14.398C6.53209 14.4392 6.48334 14.4786 6.46084 14.4861C6.43834 14.4936 6.38396 14.5255 6.33709 14.5592C6.23959 14.6267 6.07646 14.6999 6.01834 14.6999C5.99584 14.6999 5.95834 14.6755 5.93209 14.6455C5.90209 14.6099 5.86459 14.5874 5.82521 14.5836C5.77459 14.578 5.76334 14.5686 5.75021 14.5067C5.74084 14.4674 5.71646 14.428 5.69396 14.4149C5.66021 14.398 5.64896 14.4017 5.61146 14.4449C5.57396 14.488 5.56834 14.5161 5.56834 14.638C5.56834 14.7749 5.56646 14.7805 5.50271 14.8386C5.42959 14.9061 5.42209 14.9567 5.45771 15.1124C5.46896 15.1592 5.47646 15.2249 5.47646 15.2586C5.47459 15.3167 5.47834 15.3205 5.53459 15.3167C5.61709 15.3111 5.74271 15.3786 5.77271 15.4424C5.78584 15.4705 5.82146 15.5267 5.85146 15.5642C5.90209 15.628 5.90584 15.6449 5.90209 15.763C5.89646 15.8905 5.89646 15.8905 5.95271 15.9074L6.00896 15.9242L6.00709 16.1474C6.00521 16.3611 6.00334 16.3761 5.95646 16.4342C5.91896 16.4811 5.90771 16.5186 5.90209 16.6049C5.89646 16.753 5.90771 16.7699 6.02021 16.7567C6.08959 16.7474 6.11209 16.7511 6.11209 16.7699C6.11209 16.7849 6.10084 16.7999 6.08771 16.8055C6.03896 16.8242 6.01271 16.9742 6.00896 17.2386L6.00521 17.4992L5.94334 17.5499C5.88521 17.5967 5.88334 17.6024 5.89459 17.7017C5.90959 17.833 5.91146 17.8967 5.89646 17.9924C5.88896 18.0374 5.89271 18.0861 5.90396 18.1067C5.91896 18.1367 5.91334 18.1574 5.87771 18.2117C5.81584 18.2999 5.81771 18.3486 5.88334 18.3824C5.93396 18.4086 5.93584 18.4161 5.92834 18.5099C5.91146 18.7517 5.91146 18.7592 5.95646 18.7649C5.98459 18.7686 6.01084 18.7517 6.04084 18.7124C6.07834 18.6599 6.16271 18.5999 6.19646 18.5999C6.20209 18.5999 6.20584 18.6149 6.20584 18.6336C6.20584 18.7086 6.26584 18.838 6.30896 18.8624C6.37271 18.8961 6.63709 18.8774 6.77771 18.8267C6.96521 18.7611 7.15459 18.5342 7.08146 18.4649C7.06084 18.4461 7.06271 18.4255 7.09646 18.3374L7.13584 18.2342L7.21084 18.2399C7.25959 18.2436 7.29521 18.2361 7.30834 18.2192C7.34584 18.1742 7.43771 18.2024 7.46396 18.2661C7.49021 18.3317 7.62896 18.4311 7.69459 18.4311C7.74521 18.4311 7.75459 18.4217 7.88396 18.2155L7.96834 18.0842V17.8817C7.96834 17.7055 7.97396 17.668 8.01521 17.5892C8.05834 17.503 8.06021 17.4786 8.05834 17.218C8.05459 16.5974 8.05459 16.6199 8.09959 16.5167C8.14646 16.4042 8.14084 16.3124 8.08459 16.2486C8.02459 16.183 7.98896 16.0499 8.01334 15.9842C8.04521 15.8942 8.16334 15.7461 8.28709 15.6392C8.37709 15.5605 8.39959 15.5305 8.39959 15.4855C8.39959 15.4274 8.33396 15.3486 8.26646 15.328C8.24771 15.3205 8.22709 15.298 8.22334 15.2755C8.21959 15.253 8.20271 15.163 8.18584 15.0749C8.11271 14.6586 8.10709 14.6492 7.95709 14.5386C7.90834 14.503 7.90459 14.4936 7.92709 14.458C7.96646 14.3924 7.95521 14.3099 7.90271 14.2761C7.86146 14.2499 7.85584 14.233 7.85584 14.1355C7.85584 14.0267 7.85209 14.0211 7.76584 13.9311C7.71521 13.8786 7.65896 13.8374 7.63834 13.8374C7.61771 13.8374 7.56896 13.8542 7.52959 13.8767C7.46396 13.9124 7.45459 13.9124 7.43959 13.8861C7.42084 13.8524 7.32896 13.7999 7.28959 13.7999C7.27459 13.7999 7.24646 13.813 7.22396 13.828Z" fill={color}/>
<path d="M17.2309 20.1017C17.1222 20.1429 16.9666 20.2104 16.8859 20.2498L16.7378 20.3229L16.6909 20.2873C16.6666 20.2667 16.6234 20.2498 16.5991 20.2498C16.5747 20.2498 16.5184 20.2404 16.4734 20.2292C16.4041 20.2123 16.3853 20.2142 16.3291 20.2479C16.2934 20.2704 16.2541 20.2873 16.2409 20.2873C16.2278 20.2873 16.0966 20.3454 15.9503 20.4167C15.7103 20.5329 15.6691 20.5479 15.5247 20.561C15.4366 20.5685 15.2922 20.5742 15.2022 20.5723C15.0297 20.5667 14.9978 20.576 14.8572 20.6717C14.8197 20.6979 14.7634 20.7185 14.7316 20.7185C14.6678 20.7185 14.4447 20.6117 14.3453 20.5329C14.1934 20.4148 14.1653 20.3998 14.0866 20.3998C13.9966 20.3998 13.9684 20.3679 13.9684 20.2685C13.9684 20.1129 13.8616 20.0885 13.7509 20.2198C13.7003 20.2798 13.6647 20.3042 13.6141 20.3135C13.5766 20.3192 13.4809 20.3679 13.4003 20.4204C13.2184 20.5385 13.1659 20.5367 13.0591 20.4092C13.0197 20.3604 12.9747 20.3248 12.9541 20.3248C12.9316 20.3248 12.8809 20.3529 12.8378 20.3885C12.7947 20.4242 12.7291 20.4654 12.6916 20.4804C12.5922 20.5217 12.5547 20.5817 12.5284 20.7485C12.5134 20.8292 12.4966 20.9323 12.4872 20.9773C12.4722 21.0635 12.4909 21.2979 12.5228 21.3785C12.5453 21.4385 12.5978 21.4704 12.6503 21.4573C12.6803 21.4498 12.6953 21.4592 12.7159 21.5004C12.7403 21.551 12.7441 21.5529 12.9372 21.5642C13.1903 21.581 13.2391 21.596 13.3047 21.6748C13.3778 21.7629 13.3816 21.7648 13.4997 21.7798C13.6234 21.7948 13.6384 21.8004 13.7622 21.9073C13.8278 21.9635 13.9272 22.0179 14.0584 22.0723C14.2234 22.1398 14.2628 22.1642 14.2928 22.2167C14.3191 22.2598 14.3641 22.2935 14.4316 22.3235C14.4859 22.3479 14.5422 22.3685 14.5534 22.3685C14.5647 22.3685 14.6022 22.3892 14.6341 22.4154C14.7222 22.481 14.8459 22.5073 15.0241 22.4942C15.1722 22.4848 15.1797 22.4867 15.3072 22.5523C15.4066 22.6048 15.4647 22.6535 15.5547 22.7623C15.6241 22.8448 15.6822 22.9348 15.6953 22.9779C15.7403 23.141 15.7366 23.1373 15.8678 23.1373H15.9859L16.1191 23.2573C16.2841 23.4054 16.3572 23.4335 16.4528 23.3885C16.5166 23.3585 16.5259 23.3585 16.5859 23.3885C16.6759 23.4317 16.7472 23.426 16.7959 23.3754C16.8316 23.3379 16.8372 23.3098 16.8372 23.1917C16.8372 23.0885 16.8466 23.036 16.8747 22.9873C16.8934 22.9517 16.9253 22.8917 16.9441 22.8542C16.9609 22.8185 17.0172 22.7604 17.0659 22.7267C17.1147 22.691 17.1559 22.6498 17.1559 22.631C17.1559 22.5767 17.0622 22.4267 17.0209 22.4154C16.9909 22.4042 16.9853 22.3929 16.9966 22.3535C17.0022 22.3254 17.0134 22.2598 17.0191 22.2092C17.0303 22.106 17.0359 22.1154 16.8784 21.9804C16.8278 21.9373 16.8147 21.9092 16.8053 21.8323C16.7959 21.7442 16.8016 21.7254 16.8634 21.6242C16.9009 21.5642 16.9309 21.5042 16.9309 21.4929C16.9309 21.4817 16.9422 21.4592 16.9572 21.446C16.9703 21.431 16.9909 21.3654 17.0022 21.2998C17.0209 21.1967 17.0359 21.1667 17.1053 21.0935C17.1522 21.0467 17.2216 20.9398 17.2647 20.8498C17.3059 20.7617 17.3753 20.6323 17.4166 20.5592C17.4597 20.4879 17.4934 20.4035 17.4934 20.3754C17.4934 20.3398 17.5178 20.2929 17.5684 20.2367C17.6509 20.141 17.6603 20.1017 17.6097 20.0567C17.5553 20.006 17.4428 20.0192 17.2309 20.1017Z" fill={color}/>
</svg>

  )
}